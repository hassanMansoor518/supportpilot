import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  messageLimit: number;
  storageLimit: number;
  botLimit: number;
  apiLimit: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
    yearlyPrice: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    messageLimit: { type: Number, required: true },
    storageLimit: { type: Number, required: true }, // in MB
    botLimit: { type: Number, required: true },
    apiLimit: { type: Number, required: true },
    features: { type: [String], default: [] },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

planSchema.index({ slug: 1 });

const Plan = mongoose.models.Plan || mongoose.model<IPlan>("Plan", planSchema);

export default Plan;
