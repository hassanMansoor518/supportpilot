import { usageRepository } from "../../repositories/usage.repository";
import { subscriptionService } from "./subscription.service";
import { IUsage } from "../../model/usage.model";

export class UsageService {
  async getUsage(userId: string) {
    const usage = await usageRepository.findOrCreateByUserId(userId);
    const sub = await subscriptionService.getCurrentSubscription(userId);
    const plan = (sub as any).plan; // populated plan object

    // Extract limits from populated plan, with standard fallback defaults
    const limits = {
      messages: plan?.messageLimit ?? 1000,
      bots: plan?.botLimit ?? 3,
      storage: plan?.storageLimit ?? 50,
      apiCalls: plan?.apiLimit ?? 1000,
      aiRequests: plan?.messageLimit ?? 1000, // proportional default
    };

    // Return frontend-compliant structure
    return {
      messages: {
        used: usage.messagesUsed,
        limit: limits.messages,
        label: "Messages",
      },
      storage: {
        used: usage.storageUsed,
        limit: limits.storage,
        label: "Storage",
        unit: "MB",
      },
      bots: {
        used: usage.botsCreated,
        limit: limits.bots,
        label: "Bots",
      },
      apiCalls: {
        used: usage.apiRequests,
        limit: limits.apiCalls,
        label: "API Calls",
      },
      aiRequests: {
        used: usage.messagesUsed, // proportional AI requests tracking
        limit: limits.aiRequests,
        label: "AI Requests",
      },
      monthlyUsage: [
        // Since we don't have historical months, we'll return the current month's usage. 
        // In a more complex app, we'd query past invoices or logs.
        { 
          month: new Date().toLocaleDateString("en-US", { month: "short" }), 
          messages: usage.messagesUsed, 
          aiRequests: usage.messagesUsed 
        },
      ],
      dailyRequests: usage.dailyStats.length > 0 ? usage.dailyStats : [
        { date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" }), requests: 0 }
      ],
      topBots: usage.botUsage.length > 0 ? usage.botUsage.sort((a, b) => b.messages - a.messages).slice(0, 5) : [],
    };
  }

  async getUsageHistory(userId: string) {
    const usage = await usageRepository.findOrCreateByUserId(userId);
    return {
      success: true,
      data: {
        resetDate: usage.resetDate,
        usage: await this.getUsage(userId),
      },
    };
  }

  async resetMonthlyUsage(userId: string): Promise<IUsage | null> {
    return usageRepository.resetMonthlyUsage(userId);
  }
}

export const usageService = new UsageService();
