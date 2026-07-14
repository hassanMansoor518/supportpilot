import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { paymentMethodService } from "@/src/services/server/paymentMethod.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const PATCH = withAuth(async (req: NextRequest, { params, user }) => {
  try {
    // Await params as required by Next.js 15
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return errorResponse("Payment method ID is required", 400);
    }

    const updated = await paymentMethodService.setDefaultPaymentMethod(user.id, id);

    // Format for client compatibility
    const formatted = updated.map((pm) => ({
      id: pm._id.toString(),
      brand: pm.brand,
      last4: pm.last4,
      expiryMonth: pm.expMonth,
      expiryYear: pm.expYear,
      isDefault: pm.isDefault,
    }));

    return successResponse(formatted, "Default payment method updated successfully");
  } catch (error: any) {
    console.error("Payment method PATCH default error:", error);
    return errorResponse(error.message || "Failed to update default payment method", 500);
  }
});
