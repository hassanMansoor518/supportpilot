import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stripePaymentIntentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1 });

const PaymentModel =
  mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;
