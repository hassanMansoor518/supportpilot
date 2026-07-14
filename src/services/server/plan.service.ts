import { planRepository } from "../../repositories/plan.repository";
import { IPlan } from "../../model/plan.model";

export class PlanService {
  async getPlans(): Promise<IPlan[]> {
    let plans = await planRepository.findAllActive();
    if (plans.length === 0) {
      await this.seedPlans();
      plans = await planRepository.findAllActive();
    }
    return plans;
  }

  async getPlanById(id: string): Promise<IPlan | null> {
    return planRepository.findById(id);
  }

  async getPlanBySlug(slug: string): Promise<IPlan | null> {
    return planRepository.findBySlug(slug);
  }

  async seedPlans(): Promise<void> {
    const defaultPlans = [
      {
        name: "Starter",
        slug: "starter",
        description: "Perfect for personal projects and small blogs — completely free.",
        monthlyPrice: 0,
        yearlyPrice: 0,
        currency: "usd",
        messageLimit: 1000,
        storageLimit: 50,
        botLimit: 3,
        apiLimit: 1000,
        features: [
          "3 AI Chatbots",
          "1,000 Messages / month",
          "Standard AI Models",
          "50MB Storage",
          "Email Support",
          "Core Integrations"
        ],
        isPopular: false,
        isActive: true,
      },
      {
        name: "Pro",
        slug: "pro",
        description: "Ideal for growing businesses needing advanced AI capabilities.",
        monthlyPrice: 49,
        yearlyPrice: 39, // Billed annually: $468 (which is $39/mo or $49/mo with 20% off)
        currency: "usd",
        messageLimit: 10000,
        storageLimit: 500,
        botLimit: 10,
        apiLimit: 15000,
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
        isPopular: true,
        isActive: true,
      },
      {
        name: "Business",
        slug: "business",
        description: "Designed for scaling enterprises with high volume requirements.",
        monthlyPrice: 99,
        yearlyPrice: 79,
        currency: "usd",
        messageLimit: 50000,
        storageLimit: 2000,
        botLimit: 30,
        apiLimit: 50000,
        features: [
          "30 AI Chatbots",
          "50,500 Messages / month",
          "All Premium AI Models",
          "2GB Storage",
          "Dedicated account manager",
          "Custom system prompts",
          "Custom integrations & OAuth",
          "99.9% Uptime SLA"
        ],
        isPopular: false,
        isActive: true,
      }
    ];

    for (const plan of defaultPlans) {
      const existing = await planRepository.findBySlug(plan.slug);
      if (!existing) {
        await planRepository.create(plan);
      }
    }
  }
}

export const planService = new PlanService();
