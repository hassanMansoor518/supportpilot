import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice extends Document {
  subscription: mongoose.Types.ObjectId;
  stripeInvoiceId: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: string;
  paidAt?: Date;
  hostedInvoiceUrl?: string;
  invoicePdf?: string;
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription", required: true },
    stripeInvoiceId: { type: String, required: true, unique: true },
    invoiceNumber: { type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, required: true },
    paidAt: { type: Date },
    hostedInvoiceUrl: { type: String },
    invoicePdf: { type: String },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.index({ subscription: 1 });
invoiceSchema.index({ stripeInvoiceId: 1 });

const InvoiceModel =
  mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", invoiceSchema);

export default InvoiceModel;
