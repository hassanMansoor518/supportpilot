import mongoose, { Document, Schema } from "mongoose";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  status: string;
  billingCycle: "monthly" | "yearly";
  trialEndsAt?: Date;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String },
    stripePriceId: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["active", "cancelled", "past_due", "unpaid", "trialing", "none"],
      default: "none",
    },
    billingCycle: {
      type: String,
      required: true,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    trialEndsAt: { type: Date },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });

const SubscriptionModel =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", subscriptionSchema);

export default SubscriptionModel;
