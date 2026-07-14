import { invoiceRepository, InvoiceQueryParams } from "../../repositories/invoice.repository";
import { IInvoice } from "../../model/invoice.model";

export class InvoiceService {
  async getInvoices(params: InvoiceQueryParams) {
    return invoiceRepository.findInvoices(params);
  }

  async getInvoiceById(id: string): Promise<IInvoice | null> {
    return invoiceRepository.findById(id);
  }

  async getDownloadUrl(id: string): Promise<string> {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) throw new Error("Invoice not found");
    return invoice.invoicePdf || `https://supportpilot.com/invoices/${id}.pdf`;
  }
}

export const invoiceService = new InvoiceService();
