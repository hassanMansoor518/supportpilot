import stripe from "../../lib/stripeClient";
import User from "../../model/user.model";
import { subscriptionRepository } from "../../repositories/subscription.repository";

export class StripeService {
  async getOrCreateCustomer(userId: string): Promise<string> {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const subscription = await subscriptionRepository.findByUserId(userId);
    if (subscription?.stripeCustomerId) {
      return subscription.stripeCustomerId;
    }

    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    return customer.id;
  }

  async createCheckoutSession(
    userId: string,
    planSlug: string,
    billingCycle: "monthly" | "yearly",
    successUrl: string,
    cancelUrl: string
  ): Promise<string> {
    const customerId = await this.getOrCreateCustomer(userId);

    // Map plans to mock stripe price ids
    const priceId = `price_${planSlug}_${billingCycle}`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        userId,
        planSlug,
        cycle: billingCycle,
      },
    });

    if (!session.url) {
      throw new Error("Failed to generate stripe checkout session url");
    }

    return session.url;
  }

  async createBillingPortalSession(userId: string, returnUrl: string): Promise<string> {
    const customerId = await this.getOrCreateCustomer(userId);
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return session.url;
  }

  async createSetupIntent(userId: string): Promise<{ clientSecret: string; paymentMethodId: string }> {
    const customerId = await this.getOrCreateCustomer(userId);
    const intent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    });

    return {
      clientSecret: intent.client_secret || "",
      paymentMethodId: intent.id,
    };
  }

  async attachPaymentMethod(customerId: string, paymentMethodId: string): Promise<any> {
    return stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<any> {
    return stripe.paymentMethods.detach(paymentMethodId);
  }
}

export const stripeService = new StripeService();
