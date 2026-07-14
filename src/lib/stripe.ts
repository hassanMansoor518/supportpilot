// Mock Stripe SDK wrapper for offline local sandbox execution
// Matches the official Stripe Node.js SDK interface signature exactly

export default class Stripe {
  apiKey: string;
  config: any;

  constructor(apiKey: string, config?: any) {
    this.apiKey = apiKey;
    this.config = config;
  }

  checkout = {
    sessions: {
      create: async (params: {
        customer?: string;
        customer_email?: string;
        payment_method_types?: string[];
        line_items?: Array<{
          price?: string;
          quantity?: number;
        }>;
        mode: "subscription" | "setup" | "payment";
        success_url: string;
        cancel_url: string;
        client_reference_id?: string;
        metadata?: Record<string, string>;
        subscription_data?: {
          trial_period_days?: number;
          metadata?: Record<string, string>;
        };
      }) => {
        const id = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
        const planSlug = params.metadata?.planSlug || "starter";
        const cycle = params.metadata?.cycle || "monthly";
        const userId = params.client_reference_id || "";
        
        // Build mock Stripe success redirect with session_id query
        const successUrlObj = new URL(params.success_url);
        successUrlObj.searchParams.set("session_id", id);
        
        return {
          id,
          url: `${successUrlObj.toString()}&plan=${planSlug}&cycle=${cycle}&userId=${userId}`,
          status: "open",
          payment_status: "unpaid",
        };
      },
      retrieve: async (id: string) => {
        return {
          id,
          payment_status: "paid",
          status: "complete",
          customer: "cus_test_12345",
          subscription: "sub_test_12345",
        };
      }
    }
  };

  billingPortal = {
    sessions: {
      create: async (params: { customer: string; return_url: string }) => {
        return {
          id: `bpts_test_${Math.random().toString(36).substring(2, 15)}`,
          url: params.return_url,
        };
      }
    }
  };

  customers = {
    create: async (params: { email: string; name?: string }) => {
      return {
        id: `cus_${Math.random().toString(36).substring(2, 15)}`,
        email: params.email,
        name: params.name,
      };
    }
  };

  subscriptions = {
    create: async (params: {
      customer: string;
      items: Array<{ price: string }>;
      trial_period_days?: number;
    }) => {
      return {
        id: `sub_${Math.random().toString(36).substring(2, 15)}`,
        status: "active",
        customer: params.customer,
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000),
        items: {
          data: [{ id: "si_123", price: { id: params.items[0].price } }]
        }
      };
    },
    update: async (id: string, params: {
      items?: Array<{ id: string; price: string }>;
      proration_behavior?: string;
      cancel_at_period_end?: boolean;
    }) => {
      return {
        id,
        status: "active",
        cancel_at_period_end: params.cancel_at_period_end ?? false,
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000),
      };
    },
    cancel: async (id: string) => {
      return {
        id,
        status: "canceled",
      };
    },
    retrieve: async (id: string) => {
      return {
        id,
        status: "active",
        items: {
          data: [
            {
              id: "si_mock_123",
              price: {
                id: "price_pro_monthly"
              }
            }
          ]
        }
      };
    }
  };

  setupIntents = {
    create: async (params: { customer: string; payment_method_types?: string[] }) => {
      return {
        id: `seti_${Math.random().toString(36).substring(2, 15)}`,
        client_secret: `seti_secret_${Math.random().toString(36).substring(2, 15)}`,
        customer: params.customer,
      };
    }
  };

  paymentMethods = {
    attach: async (id: string, params: { customer: string }) => {
      return {
        id,
        customer: params.customer,
        card: {
          brand: "visa",
          last4: "4242",
          exp_month: 12,
          exp_year: 2028,
        },
      };
    },
    detach: async (id: string) => {
      return {
        id,
        customer: null,
      };
    },
    list: async (params: { customer: string; type: string }) => {
      return {
        data: [
          {
            id: "pm_mock_visa",
            card: {
              brand: "visa",
              last4: "4242",
              exp_month: 12,
              exp_year: 2028,
            },
          }
        ]
      };
    }
  };

  invoices = {
    list: async (params: { customer: string }) => {
      return {
        data: [
          {
            id: "in_mock_1",
            number: "INV-001",
            subtotal: 4900,
            tax: 490,
            total: 5390,
            currency: "usd",
            status: "paid",
            invoice_pdf: "#",
            hosted_invoice_url: "#",
            created: Math.floor(Date.now() / 1000),
          }
        ]
      };
    }
  };

  webhooks = {
    constructEvent: (body: string, sig: string, secret: string) => {
      // Return parsed body as verified Stripe Event
      try {
        const payload = JSON.parse(body);
        return payload;
      } catch (err) {
        throw new Error("Invalid webhook signature simulation");
      }
    }
  };
}
