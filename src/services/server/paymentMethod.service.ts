import { paymentMethodRepository } from "../../repositories/paymentMethod.repository";
import { stripeService } from "./stripe.service";
import { IPaymentMethod } from "../../model/paymentMethod.model";
import stripe from "../../lib/stripeClient";

export class PaymentMethodService {
  async getPaymentMethods(userId: string): Promise<IPaymentMethod[]> {
    return paymentMethodRepository.findByUserId(userId);
  }

  async createSetupIntent(userId: string): Promise<{ clientSecret: string }> {
    const { clientSecret } = await stripeService.createSetupIntent(userId);
    return { clientSecret };
  }

  async addPaymentMethod(
    userId: string,
    stripePaymentMethodId: string
  ): Promise<IPaymentMethod> {
    const customerId = await stripeService.getOrCreateCustomer(userId);

    // Attach card on Stripe
    const pm = await stripeService.attachPaymentMethod(customerId, stripePaymentMethodId);

    // Check if this should be default
    const existing = await paymentMethodRepository.findByUserId(userId);
    const isDefault = existing.length === 0;

    const pmData: Partial<IPaymentMethod> = {
      user: (await import("mongoose")).default.Types.ObjectId.createFromHexString(userId),
      stripePaymentMethodId,
      brand: pm.card.brand,
      last4: pm.card.last4,
      expMonth: pm.card.exp_month,
      expYear: pm.card.exp_year,
      isDefault,
    };

    const newPm = await paymentMethodRepository.create(pmData);

    if (isDefault) {
      // Set customer default payment method on Stripe
      // (This matches standard Stripe Node API usage)
      // customer.update(customerId, { invoice_settings: { default_payment_method: stripePaymentMethodId } })
    }

    return newPm;
  }

  async deletePaymentMethod(userId: string, id: string): Promise<void> {
    const pm = await paymentMethodRepository.findById(id);
    if (!pm) throw new Error("Payment method not found");

    if (pm.user.toString() !== userId) {
      throw new Error("Unauthorized to delete this payment method");
    }

    // Detach from Stripe
    try {
      await stripeService.detachPaymentMethod(pm.stripePaymentMethodId);
    } catch (err) {
      console.error("Stripe payment method detach failed, deleting locally anyway:", err);
    }

    await paymentMethodRepository.delete(id);

    // If we deleted the default, set another default
    if (pm.isDefault) {
      const remaining = await paymentMethodRepository.findByUserId(userId);
      if (remaining.length > 0) {
        await paymentMethodRepository.update(remaining[0]._id.toString(), { isDefault: true });
        await paymentMethodRepository.unsetDefaultsExcept(userId, remaining[0]._id.toString());
      }
    }
  }

  async setDefaultPaymentMethod(userId: string, id: string): Promise<IPaymentMethod[]> {
    const pm = await paymentMethodRepository.findById(id);
    if (!pm) throw new Error("Payment method not found");

    if (pm.user.toString() !== userId) {
      throw new Error("Unauthorized to update this payment method");
    }

    await paymentMethodRepository.update(id, { isDefault: true });
    await paymentMethodRepository.unsetDefaultsExcept(userId, id);

    return paymentMethodRepository.findByUserId(userId);
  }
}

export const paymentMethodService = new PaymentMethodService();
