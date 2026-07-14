import { couponRepository } from "../../repositories/coupon.repository";
import { ICoupon } from "../../model/coupon.model";

export class CouponService {
  async applyCoupon(userId: string, code: string): Promise<ICoupon> {
    const coupon = await couponRepository.findByCode(code);
    if (!coupon) {
      throw new Error("Coupon code is invalid");
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      throw new Error("Coupon code has expired");
    }

    if (
      coupon.maxRedemptions !== undefined &&
      coupon.redemptionsCount >= coupon.maxRedemptions
    ) {
      throw new Error("Coupon code has reached maximum redemptions limit");
    }

    // Register redemption
    await couponRepository.incrementRedemptions(code);

    return coupon;
  }
}

export const couponService = new CouponService();
