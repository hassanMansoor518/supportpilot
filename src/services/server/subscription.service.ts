import { subscriptionRepository } from "../../repositories/subscription.repository";
import { planService } from "./plan.service";
import { stripeService } from "./stripe.service";
import stripe from "../../lib/stripeClient";
import SubscriptionModel, { ISubscription } from "../../model/subscription.model";
import { usageRepository } from "../../repositories/usage.repository";

export class SubscriptionService {
  async getCurrentSubscription(userId: string): Promise<ISubscription> {
    let sub = await subscriptionRepository.findByUserId(userId);
    if (!sub) {
      // Find starter plan
      const starterPlan = await planService.getPlanBySlug("starter");
      if (!starterPlan) {
        await planService.seedPlans();
      }
      const plan = await planService.getPlanBySlug("starter");
      if (!plan) throw new Error("Starter plan not found");

      const customerId = await stripeService.getOrCreateCustomer(userId);

      // Create local active free subscription
      sub = await subscriptionRepository.create({
        user: (await import("mongoose")).default.Types.ObjectId.createFromHexString(userId),
        plan: plan._id,
        stripeCustomerId: customerId,
        status: "active",
        billingCycle: "monthly",
        cancelAtPeriodEnd: false,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      // Seed default usage for this user
      await usageRepository.findOrCreateByUserId(userId);
    }
    return sub;
  }

  async activateFreePlan(userId: string, planSlug: string): Promise<ISubscription> {
    const plan = await planService.getPlanBySlug(planSlug);
    if (!plan) throw new Error("Plan not found");
    if (plan.monthlyPrice !== 0 && plan.yearlyPrice !== 0) {
      throw new Error("Direct activation is only supported for Free plans");
    }

    const currentSub = await this.getCurrentSubscription(userId);

    // If they have an active Stripe subscription, cancel it
    if (currentSub.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(currentSub.stripeSubscriptionId);
      } catch (err) {
        console.error("Error cancelling old Stripe subscription:", err);
      }
    }

    const updatedSub = await subscriptionRepository.update(currentSub._id.toString(), {
      plan: plan._id,
      status: "active",
      billingCycle: "monthly",
      stripeSubscriptionId: undefined,
      stripePriceId: undefined,
      cancelAtPeriodEnd: false,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return updatedSub!;
  }

  async cancelSubscription(userId: string): Promise<ISubscription> {
    const currentSub = await this.getCurrentSubscription(userId);
    if (!currentSub.stripeSubscriptionId) {
      // Just mark local cancelled since it's free/starter
      const updated = await subscriptionRepository.update(currentSub._id.toString(), {
        cancelAtPeriodEnd: true,
      });
      return updated!;
    }

    // Call Stripe to cancel at period end
    await stripe.subscriptions.update(currentSub.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    const updated = await subscriptionRepository.update(currentSub._id.toString(), {
      cancelAtPeriodEnd: true,
    });

    return updated!;
  }

  async resumeSubscription(userId: string): Promise<ISubscription> {
    const currentSub = await this.getCurrentSubscription(userId);
    if (!currentSub.stripeSubscriptionId) {
      const updated = await subscriptionRepository.update(currentSub._id.toString(), {
        cancelAtPeriodEnd: false,
      });
      return updated!;
    }

    // Call Stripe to resume (unset cancel_at_period_end)
    await stripe.subscriptions.update(currentSub.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    const updated = await subscriptionRepository.update(currentSub._id.toString(), {
      cancelAtPeriodEnd: false,
    });

    return updated!;
  }

  async upgradeOrDowngrade(
    userId: string,
    planSlug: string,
    billingCycle: "monthly" | "yearly"
  ): Promise<ISubscription> {
    const plan = await planService.getPlanBySlug(planSlug);
    if (!plan) throw new Error("Plan not found");

    if (plan.monthlyPrice === 0) {
      return this.activateFreePlan(userId, planSlug);
    }

    const currentSub = await this.getCurrentSubscription(userId);
    if (!currentSub.stripeSubscriptionId) {
      throw new Error("No active subscription to upgrade/downgrade. Please complete checkout first.");
    }

    const priceId = `price_${planSlug}_${billingCycle}`;

    // Update Stripe subscription items (using simple proration)
    const stripeSub = await stripe.subscriptions.retrieve(currentSub.stripeSubscriptionId);
    const subscriptionItemId = stripeSub.items.data[0].id;

    await stripe.subscriptions.update(currentSub.stripeSubscriptionId, {
      proration_behavior: "create_prorations",
      items: [
        {
          id: subscriptionItemId,
          price: priceId,
        },
      ],
    });

    const updated = await subscriptionRepository.update(currentSub._id.toString(), {
      plan: plan._id,
      stripePriceId: priceId,
      billingCycle,
    });

    return updated!;
  }
}

export const subscriptionService = new SubscriptionService();
