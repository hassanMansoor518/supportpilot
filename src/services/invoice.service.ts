import { delay, getInvoices } from "./mockDb";
import { Invoice } from "../types/Invoice";

export const invoiceService = {
  getInvoices: async (): Promise<Invoice[]> => {
    await delay(500);
    return getInvoices();
  },

  downloadPdf: async (invoiceId: string): Promise<string> => {
    await delay(1200);
    // Return a dummy link or raise success alert on UI
    return `https://supportpilot.com/invoices/${invoiceId}.pdf`;
  }
};
