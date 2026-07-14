import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { subscriptionService } from "@/src/services/server/subscription.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const sub = await subscriptionService.cancelSubscription(user.id);
    return successResponse(sub, "Subscription cancelled successfully");
  } catch (error: any) {
    console.error("Cancel POST error:", error);
    return errorResponse(error.message || "Failed to cancel subscription", 500);
  }
});
