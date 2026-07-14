import CouponModel, { ICoupon } from "../model/coupon.model";

export class CouponRepository {
  async findByCode(code: string): Promise<ICoupon | null> {
    return CouponModel.findOne({ code: code.toUpperCase() });
  }

  async incrementRedemptions(code: string): Promise<ICoupon | null> {
    return CouponModel.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { redemptionsCount: 1 } },
      { new: true }
    );
  }

  async create(couponData: Partial<ICoupon>): Promise<ICoupon> {
    return CouponModel.create(couponData);
  }
}

export const couponRepository = new CouponRepository();
