import { Subscription } from "./Subscription";
import { PaymentMethod } from "./PaymentMethod";
import { Invoice } from "./Invoice";
import { Usage } from "./Usage";

export interface BillingOverview {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  usage: Usage;
}
