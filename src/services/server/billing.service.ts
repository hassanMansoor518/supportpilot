import { subscriptionService } from "./subscription.service";
import { usageService } from "./usage.service";
import { invoiceService } from "./invoice.service";
import { paymentMethodService } from "./paymentMethod.service";

export class BillingService {
  async getOverview(userId: string) {
    const subscription = await subscriptionService.getCurrentSubscription(userId);
    const populatedPlan = (subscription as any).plan;

    const usage = await usageService.getUsage(userId);
    const invoicesResult = await invoiceService.getInvoices({ userId, limit: 10 });
    const paymentMethods = await paymentMethodService.getPaymentMethods(userId);

    // Format subscription structure for client compatibility
    const formattedSubscription = {
      id: subscription.stripeSubscriptionId || subscription._id.toString(),
      planId: populatedPlan?.slug || "starter",
      status: subscription.status,
      billingCycle: subscription.billingCycle,
      price: populatedPlan ? (subscription.billingCycle === "yearly" ? populatedPlan.yearlyPrice : populatedPlan.monthlyPrice) : 0,
      startDate: subscription.currentPeriodStart?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      renewalDate: subscription.currentPeriodEnd?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    };

    // Format invoices for client compatibility
    const formattedInvoices = invoicesResult.invoices.map((inv) => ({
      id: inv.stripeInvoiceId || inv._id.toString(),
      date: inv.paidAt?.toISOString().split("T")[0] || inv.createdAt.toISOString().split("T")[0],
      amount: inv.total / 100,
      tax: inv.tax / 100,
      status: inv.status,
      paymentMethod: {
        brand: "visa",
        last4: "4242",
      },
      pdfUrl: inv.invoicePdf || "#",
    }));

    // Format payment methods for client compatibility
    const formattedPMs = paymentMethods.map((pm) => ({
      id: pm._id.toString(),
      brand: pm.brand,
      last4: pm.last4,
      expiryMonth: pm.expMonth,
      expiryYear: pm.expYear,
      isDefault: pm.isDefault,
      cardholderName: "Card Owner",
      billingAddress: {
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    }));

    return {
      subscription: formattedSubscription,
      paymentMethods: formattedPMs,
      invoices: formattedInvoices,
      usage,
    };
  }
}

export const billingService = new BillingService();
