import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { subscriptionService } from "@/src/services/server/subscription.service";
import { upgradeSchema } from "@/src/validators/billing.validator";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const body = await req.json();
    const parsed = upgradeSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Validation failed", 400, parsed.error.issues);
    }

    const { planSlug, billingCycle } = parsed.data;

    const sub = await subscriptionService.upgradeOrDowngrade(user.id, planSlug, billingCycle);

    return successResponse(sub, "Subscription downgraded successfully");
  } catch (error: any) {
    console.error("Downgrade POST error:", error);
    return errorResponse(error.message || "Failed to downgrade subscription", 500);
  }
});
