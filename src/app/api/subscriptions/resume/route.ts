import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { subscriptionService } from "@/src/services/server/subscription.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const sub = await subscriptionService.resumeSubscription(user.id);
    return successResponse(sub, "Subscription resumed successfully");
  } catch (error: any) {
    console.error("Resume POST error:", error);
    return errorResponse(error.message || "Failed to resume subscription", 500);
  }
});
