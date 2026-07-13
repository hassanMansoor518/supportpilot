import { delay, getUsage } from "./mockDb";
import { Usage } from "../types/Usage";

export const usageService = {
  getUsage: async (): Promise<Usage> => {
    await delay(400);
    return getUsage();
  }
};
