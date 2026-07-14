import mongoose, { Document, Schema } from "mongoose";

export interface IPaymentMethod extends Document {
  user: mongoose.Types.ObjectId;
  stripePaymentMethodId: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const paymentMethodSchema = new Schema<IPaymentMethod>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stripePaymentMethodId: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    last4: { type: String, required: true },
    expMonth: { type: Number, required: true },
    expYear: { type: Number, required: true },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

paymentMethodSchema.index({ user: 1 });

const PaymentMethodModel =
  mongoose.models.PaymentMethod ||
  mongoose.model<IPaymentMethod>("PaymentMethod", paymentMethodSchema);

export default PaymentMethodModel;
