import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { paymentMethodService } from "@/src/services/server/paymentMethod.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const DELETE = withAuth(async (req: NextRequest, { params, user }) => {
  try {
    // Await params as required by Next.js 15
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return errorResponse("Payment method ID is required", 400);
    }

    await paymentMethodService.deletePaymentMethod(user.id, id);

    return successResponse(null, "Payment method deleted successfully");
  } catch (error: any) {
    console.error("Payment method DELETE error:", error);
    return errorResponse(error.message || "Failed to delete payment method", 500);
  }
});
