export interface ResourceUsage {
  used: number;
  limit: number;
  label: string;
  unit?: string;
}

export interface MonthlyUsageItem {
  month: string;
  messages: number;
  aiRequests: number;
}

export interface DailyRequestItem {
  date: string;
  requests: number;
}

export interface BotUsageItem {
  botName: string;
  messages: number;
}

export interface Usage {
  messages: ResourceUsage;
  storage: ResourceUsage;
  bots: ResourceUsage;
  apiCalls: ResourceUsage;
  aiRequests: ResourceUsage;
  monthlyUsage: MonthlyUsageItem[];
  dailyRequests: DailyRequestItem[];
  topBots: BotUsageItem[];
}
