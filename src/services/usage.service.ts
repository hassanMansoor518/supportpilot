import { Usage } from "../types/Usage";

export const usageService = {
  getUsage: async (): Promise<Usage> => {
    const res = await fetch("/api/usage", { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || "Failed to fetch usage data");
    }

    return data.data as Usage;
  }
};
