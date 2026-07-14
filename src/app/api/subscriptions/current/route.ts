import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { subscriptionService } from "@/src/services/server/subscription.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const subscription = await subscriptionService.getCurrentSubscription(user.id);
    const populatedPlan = (subscription as any).plan;
    
    // Format for client compatibility
    const formattedSubscription = {
      id: subscription.stripeSubscriptionId || subscription._id.toString(),
      planId: populatedPlan?.slug || "starter",
      status: subscription.status,
      billingCycle: subscription.billingCycle,
      price: populatedPlan ? (subscription.billingCycle === "yearly" ? populatedPlan.yearlyPrice : populatedPlan.monthlyPrice) : 0,
      startDate: subscription.currentPeriodStart?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      renewalDate: subscription.currentPeriodEnd?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    };

    return successResponse(formattedSubscription, "Current subscription retrieved successfully");
  } catch (error: any) {
    console.error("Subscription current GET error:", error);
    return errorResponse(error.message || "Failed to retrieve subscription", 500);
  }
});
