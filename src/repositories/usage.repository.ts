import UsageModel, { IUsage } from "../model/usage.model";

export class UsageRepository {
  async findByUserId(userId: string): Promise<IUsage | null> {
    return UsageModel.findOne({ user: userId });
  }

  async findOrCreateByUserId(userId: string): Promise<IUsage> {
    const existing = await UsageModel.findOne({ user: userId });
    if (existing) return existing;

    const resetDate = new Date();
    resetDate.setMonth(resetDate.getMonth() + 1);

    return UsageModel.create({
      user: userId,
      messagesUsed: 0,
      storageUsed: 0,
      apiRequests: 0,
      botsCreated: 0,
      resetDate,
      dailyStats: [],
      botUsage: [],
    });
  }

  async incrementMessages(userId: string, count: number, botName: string = "Default Bot"): Promise<IUsage | null> {
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" }); // e.g. "Jul 08"
    
    // We will do a two-step update to ensure dailyStats and botUsage are updated correctly
    const usage = await UsageModel.findOne({ user: userId });
    if (!usage) return null;

    usage.messagesUsed += count;
    
    // Update daily stats
    const dailyStat = usage.dailyStats.find(s => s.date === today);
    if (dailyStat) {
      dailyStat.requests += count;
    } else {
      usage.dailyStats.push({ date: today, requests: count });
    }
    
    // Keep only last 30 days
    if (usage.dailyStats.length > 30) {
      usage.dailyStats.shift();
    }

    // Update bot usage
    const botStat = usage.botUsage.find(b => b.botName === botName);
    if (botStat) {
      botStat.messages += count;
    } else {
      usage.botUsage.push({ botName, messages: count });
    }

    return usage.save();
  }

  async incrementApiRequests(userId: string, count: number): Promise<IUsage | null> {
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    
    const usage = await UsageModel.findOne({ user: userId });
    if (!usage) return null;

    usage.apiRequests += count;
    
    const dailyStat = usage.dailyStats.find(s => s.date === today);
    if (dailyStat) {
      dailyStat.requests += count;
    } else {
      usage.dailyStats.push({ date: today, requests: count });
    }
    
    if (usage.dailyStats.length > 30) {
      usage.dailyStats.shift();
    }

    return usage.save();
  }

  async setBotsCreated(userId: string, count: number): Promise<IUsage | null> {
    return UsageModel.findOneAndUpdate(
      { user: userId },
      { botsCreated: count },
      { new: true }
    );
  }

  async setStorageUsed(userId: string, count: number): Promise<IUsage | null> {
    return UsageModel.findOneAndUpdate(
      { user: userId },
      { storageUsed: count },
      { new: true }
    );
  }

  async resetMonthlyUsage(userId: string): Promise<IUsage | null> {
    const resetDate = new Date();
    resetDate.setMonth(resetDate.getMonth() + 1);

    return UsageModel.findOneAndUpdate(
      { user: userId },
      {
        messagesUsed: 0,
        apiRequests: 0,
        resetDate,
        dailyStats: [],
        botUsage: [],
      },
      { new: true }
    );
  }
}

export const usageRepository = new UsageRepository();
