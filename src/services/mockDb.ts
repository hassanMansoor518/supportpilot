import { Plan, Subscription } from "../types/Subscription";
import { Invoice } from "../types/Invoice";
import { PaymentMethod } from "../types/PaymentMethod";
import { Usage } from "../types/Usage";

// In-memory mock database state
export const PLANS: Plan[] = [

  {
    id: "starter",
    name: "Starter",
    price: 0,
    description: "Perfect for personal projects and small blogs — completely free.",
    features: [
      "3 AI Chatbots",
      "1,000 Messages / month",
      "Standard AI Models",
      "50MB Storage",
      "Email Support",
      "Core Integrations"
    ],
    limits: { messages: 1000, bots: 3, storage: 50, aiRequests: 1000 }
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "Ideal for growing businesses needing advanced AI capabilities.",
    features: [
      "10 AI Chatbots",
      "10,000 Messages / month",
      "Advanced AI Models (Claude, GPT-4)",
      "500MB Storage",
      "Priority Support (1h)",
      "Remove 'Powered by SupportPilot' branding",
      "Advanced Analytics",
      "Unlimited Webhooks & API Access"
    ],
    limits: { messages: 10000, bots: 10, storage: 500, aiRequests: 10000 },
    isRecommended: true
  },
  {
    id: "business",
    name: "Business",
    price: 99,
    description: "Designed for scaling enterprises with high volume requirements.",
    features: [
      "30 AI Chatbots",
      "50,000 Messages / month",
      "All Premium AI Models",
      "2GB Storage",
      "Dedicated account manager",
      "Custom system prompts",
      "Custom integrations & OAuth",
      "99.9% Uptime SLA"
    ],
    limits: { messages: 50000, bots: 30, storage: 2000, aiRequests: 50000 }
  },
];

// Helper to load or initialize from localStorage if client-side
const getInitialSubscription = (): Subscription | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sp_subscription");
    if (saved) return JSON.parse(saved);
  }
  // Default is Pro user
  return {
    id: "sub_1N8y2FHgL2uV8x",
    planId: "pro",
    status: "active",
    billingCycle: "monthly",
    price: 49,
    startDate: "2026-05-15",
    renewalDate: "2026-08-15",
    cancelAtPeriodEnd: false
  };
};

const getInitialPaymentMethods = (): PaymentMethod[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sp_payment_methods");
    if (saved) return JSON.parse(saved);
  }
  return [
    {
      id: "pm_1",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2028,
      isDefault: true,
      cardholderName: "Alex Mercer",
      billingAddress: {
        line1: "123 Innovation Way",
        city: "San Francisco",
        state: "CA",
        postalCode: "94107",
        country: "United States"
      }
    },
    {
      id: "pm_2",
      brand: "mastercard",
      last4: "8888",
      expiryMonth: 8,
      expiryYear: 2027,
      isDefault: false,
      cardholderName: "Alex Mercer",
      billingAddress: {
        line1: "123 Innovation Way",
        city: "San Francisco",
        state: "CA",
        postalCode: "94107",
        country: "United States"
      }
    }
  ];
};

const getInitialInvoices = (): Invoice[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sp_invoices");
    if (saved) return JSON.parse(saved);
  }
  return [
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
  ];
};

const getInitialUsage = (): Usage => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sp_usage");
    if (saved) return JSON.parse(saved);
  }
  return {
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
};

// State variables
let subscriptionState = getInitialSubscription();
let paymentMethodsState = getInitialPaymentMethods();
let invoicesState = getInitialInvoices();
let usageState = getInitialUsage();

// Helper to persist state
export const saveState = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sp_subscription", JSON.stringify(subscriptionState));
    localStorage.setItem("sp_payment_methods", JSON.stringify(paymentMethodsState));
    localStorage.setItem("sp_invoices", JSON.stringify(invoicesState));
    localStorage.setItem("sp_usage", JSON.stringify(usageState));
  }
};

// Delay simulation for realistic async behaviour
export const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Get current db values
export const getSubscription = () => subscriptionState;
export const getPaymentMethods = () => paymentMethodsState;
export const getInvoices = () => invoicesState;
export const getUsage = () => usageState;

// Set current db values (mutators)
export const updateSubscription = (sub: Subscription | null) => {
  subscriptionState = sub;
  saveState();
};

export const updatePaymentMethods = (pms: PaymentMethod[]) => {
  paymentMethodsState = pms;
  saveState();
};

export const updateInvoices = (invs: Invoice[]) => {
  invoicesState = invs;
  saveState();
};

export const updateUsageState = (usage: Usage) => {
  usageState = usage;
  saveState();
};
