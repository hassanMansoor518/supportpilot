import { z } from "zod";

export const checkoutSchema = z.object({
  planSlug: z.enum(["starter", "pro", "business"]),
  billingCycle: z.enum(["monthly", "yearly"]),
});

export const upgradeSchema = z.object({
  planSlug: z.enum(["starter", "pro", "business"]),
  billingCycle: z.enum(["monthly", "yearly"]),
});

export const addPaymentMethodSchema = z.object({
  paymentMethodId: z.string().min(1, "Payment method ID is required"),
});

export const couponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
});

export const invoiceQuerySchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.string().transform((val) => parseInt(val, 10)).optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).optional(),
});
