export type PlanType = "free" | "starter" | "pro" | "business" | "enterprise";
export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "none";
export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
  limits: {
    messages: number;
    bots: number;
    storage: number; // in MB
    aiRequests: number;
  };
  description: string;
  isRecommended?: boolean;
}

export interface Subscription {
  id: string;
  planId: PlanType;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  startDate: string;
  renewalDate: string;
  cancelAtPeriodEnd: boolean;
}
