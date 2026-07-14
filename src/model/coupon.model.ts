import mongoose, { Document, Schema } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiresAt?: Date;
  maxRedemptions?: number;
  redemptionsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, required: true, enum: ["percentage", "fixed"] },
    discountValue: { type: Number, required: true },
    expiresAt: { type: Date },
    maxRedemptions: { type: Number },
    redemptionsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ code: 1 });

const CouponModel =
  mongoose.models.Coupon ||
  mongoose.model<ICoupon>("Coupon", couponSchema);

export default CouponModel;
