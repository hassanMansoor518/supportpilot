import { BillingOverview } from "../types/Billing";

export const billingService = {
  getOverview: async (): Promise<BillingOverview> => {
    const res = await fetch("/api/billing/overview", { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Failed to fetch billing overview");
    }

    return data.data as BillingOverview;
  },
};

