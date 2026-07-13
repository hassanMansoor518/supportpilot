export type InvoiceStatus = "paid" | "open" | "void" | "uncollectible" | "failed";

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  tax: number;
  status: InvoiceStatus;
  paymentMethod: {
    brand: string;
    last4: string;
  };
  pdfUrl: string;
}
