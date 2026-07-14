import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { paymentMethodService } from "@/src/services/server/paymentMethod.service";
import { addPaymentMethodSchema } from "@/src/validators/billing.validator";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const paymentMethods = await paymentMethodService.getPaymentMethods(user.id);
    // Format for client compatibility
    const formatted = paymentMethods.map((pm) => ({
      id: pm._id.toString(),
      brand: pm.brand,
      last4: pm.last4,
      expiryMonth: pm.expMonth,
      expiryYear: pm.expYear,
      isDefault: pm.isDefault,
      cardholderName: "Card Owner",
      billingAddress: {
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    }));
    return successResponse(formatted, "Payment methods retrieved successfully");
  } catch (error: any) {
    console.error("Payment methods GET error:", error);
    return errorResponse(error.message || "Failed to retrieve payment methods", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const body = await req.json();
    const parsed = addPaymentMethodSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Validation failed", 400, parsed.error.issues);
    }

    const { paymentMethodId } = parsed.data;

    const pm = await paymentMethodService.addPaymentMethod(user.id, paymentMethodId);

    return successResponse(
      {
        id: pm._id.toString(),
        brand: pm.brand,
        last4: pm.last4,
        expiryMonth: pm.expMonth,
        expiryYear: pm.expYear,
        isDefault: pm.isDefault,
      },
      "Payment method attached successfully",
      201
    );
  } catch (error: any) {
    console.error("Payment method POST error:", error);
    return errorResponse(error.message || "Failed to attach payment method", 500);
  }
});
