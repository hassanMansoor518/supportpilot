import { delay, getSubscription, getPaymentMethods, getInvoices, getUsage } from "./mockDb";
import { BillingOverview } from "../types/Billing";

export const billingService = {
  getOverview: async (): Promise<BillingOverview> => {
    await delay(600);
    return {
      subscription: getSubscription(),
      paymentMethods: getPaymentMethods(),
      invoices: getInvoices(),
      usage: getUsage(),
    };
  },
  
  // Resets the demo state back to default or a specific case (first-time, free, pro) for interactive testing
  resetDemoState: async (type: "new" | "free" | "pro"): Promise<BillingOverview> => {
    await delay(800);
    const { updateSubscription, updateInvoices, updateUsageState } = await import("./mockDb");
    
    if (type === "new") {
      updateSubscription(null);
      updateInvoices([]);
      updateUsageState({
        messages: { used: 0, limit: 0, label: "Messages" },
        storage: { used: 0, limit: 0, label: "Storage", unit: "MB" },
        bots: { used: 0, limit: 0, label: "Bots" },
        apiCalls: { used: 0, limit: 0, label: "API Calls" },
        aiRequests: { used: 0, limit: 0, label: "AI Requests" },
        monthlyUsage: [],
        dailyRequests: [],
        topBots: []
      });
    } else if (type === "free") {
      updateSubscription({
        id: "sub_free",
        planId: "free",
        status: "active",
        billingCycle: "monthly",
        price: 0,
        startDate: "2026-07-01",
        renewalDate: "2026-08-01",
        cancelAtPeriodEnd: false
      });
      updateInvoices([]);
      updateUsageState({
        messages: { used: 75, limit: 100, label: "Messages" },
        storage: { used: 4.2, limit: 5, label: "Storage", unit: "MB" },
        bots: { used: 1, limit: 1, label: "Bots" },
        apiCalls: { used: 120, limit: 200, label: "API Calls" },
        aiRequests: { used: 80, limit: 100, label: "AI Requests" },
        monthlyUsage: [{ month: "Jul", messages: 75, aiRequests: 80 }],
        dailyRequests: [{ date: "Jul 13", requests: 12 }],
        topBots: [{ botName: "Basic Bot", messages: 75 }]
      });
    } else {
      updateSubscription({
        id: "sub_1N8y2FHgL2uV8x",
        planId: "pro",
        status: "active",
        billingCycle: "monthly",
        price: 49,
        startDate: "2026-05-15",
        renewalDate: "2026-08-15",
        cancelAtPeriodEnd: false
      });
      // reload original defaults
      const originalUsage = {
        messages: { used: 3820, limit: 10000, label: "Messages" },
        storage: { used: 192.5, limit: 500, label: "Storage", unit: "MB" },
        bots: { used: 4, limit: 10, label: "Bots" },
        apiCalls: { used: 7210, limit: 15000, label: "API Calls" },
        aiRequests: { used: 8430, limit: 10000, label: "AI Requests" },
        monthlyUsage: [
          { month: "Feb", messages: 2400, aiRequests: 4800 },
          { month: "Mar", messages: 3100, aiRequests: 6200 },
          { month: "Apr", messages: 1800, aiRequests: 3600 },
          { month: "May", messages: 5400, aiRequests: 9800 },
          { month: "Jun", messages: 7200, aiRequests: 13400 },
          { month: "Jul", messages: 8430, aiRequests: 15120 }
        ],
        dailyRequests: [
          { date: "Jul 07", requests: 320 },
          { date: "Jul 08", requests: 450 },
          { date: "Jul 09", requests: 580 },
          { date: "Jul 10", requests: 410 },
          { date: "Jul 11", requests: 620 },
          { date: "Jul 12", requests: 790 },
          { date: "Jul 13", requests: 840 }
        ],
        topBots: [
          { botName: "Sales Assistant", messages: 4200 },
          { botName: "Support Bot v2", messages: 2800 },
          { botName: "Lead Generator", messages: 1100 },
          { botName: "Documentation Searcher", messages: 330 }
        ]
      };
      updateUsageState(originalUsage);
      updateInvoices([
        {
          id: "INV-2026-003",
          date: "2026-07-15",
          amount: 49.0,
          tax: 4.9,
          status: "paid",
          paymentMethod: { brand: "visa", last4: "4242" },
          pdfUrl: "#"
        },
        {
          id: "INV-2026-002",
          date: "2026-06-15",
          amount: 49.0,
          tax: 4.9,
          status: "paid",
          paymentMethod: { brand: "visa", last4: "4242" },
          pdfUrl: "#"
        },
        {
          id: "INV-2026-001",
          date: "2026-05-15",
          amount: 19.0,
          tax: 1.9,
          status: "paid",
          paymentMethod: { brand: "mastercard", last4: "8888" },
          pdfUrl: "#"
        }
      ]);
    }
    
    return {
      subscription: getSubscription(),
      paymentMethods: getPaymentMethods(),
      invoices: getInvoices(),
      usage: getUsage(),
    };
  }
};
