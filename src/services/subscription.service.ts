import { delay, getSubscription, PLANS, updateSubscription, updateInvoices, getInvoices, updateUsageState, getUsage } from "./mockDb";
import { Subscription, PlanType, BillingCycle } from "../types/Subscription";

export const subscriptionService = {
  getSubscription: async (): Promise<Subscription | null> => {
    await delay(400);
    return getSubscription();
  },

  getPlans: async () => {
    await delay(300);
    return PLANS;
  },

  upgradeOrDowngrade: async (planId: PlanType, billingCycle: BillingCycle): Promise<Subscription> => {
    await delay(1000);
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) throw new Error("Plan not found");

    const currentSub = getSubscription();
    const newSub: Subscription = {
      id: currentSub?.id || `sub_${Math.random().toString(36).substring(2, 16)}`,
      planId,
      status: "active",
      billingCycle,
      price: billingCycle === "monthly" ? plan.price : Math.round(plan.price * 10 * 0.8), // 20% discount for annual
      startDate: new Date().toISOString().split("T")[0],
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      cancelAtPeriodEnd: false
    };

    updateSubscription(newSub);

    // Create an invoice for this new upgrade
    const currentInvoices = getInvoices();
    const newInvoice = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0],
      amount: newSub.price,
      tax: Math.round(newSub.price * 0.1 * 100) / 100,
      status: "paid" as const,
      paymentMethod: { brand: "visa", last4: "4242" },
      pdfUrl: "#"
    };
    updateInvoices([newInvoice, ...currentInvoices]);

    // Update usage limits based on new plan
    const currentUsage = getUsage();
    updateUsageState({
      ...currentUsage,
      messages: { ...currentUsage.messages, limit: plan.limits.messages },
      storage: { ...currentUsage.storage, limit: plan.limits.storage },
      bots: { ...currentUsage.bots, limit: plan.limits.bots },
      aiRequests: { ...currentUsage.aiRequests, limit: plan.limits.aiRequests },
    });

    return newSub;
  },

  cancelSubscription: async (): Promise<Subscription> => {
    await delay(800);
    const currentSub = getSubscription();
    if (!currentSub) throw new Error("No active subscription");

    const updatedSub: Subscription = {
      ...currentSub,
      cancelAtPeriodEnd: true,
      status: "cancelled"
    };
    updateSubscription(updatedSub);
    return updatedSub;
  },

  reactivateSubscription: async (): Promise<Subscription> => {
    await delay(800);
    const currentSub = getSubscription();
    if (!currentSub) throw new Error("No subscription to reactivate");

    const updatedSub: Subscription = {
      ...currentSub,
      cancelAtPeriodEnd: false,
      status: "active"
    };
    updateSubscription(updatedSub);
    return updatedSub;
  }
};
