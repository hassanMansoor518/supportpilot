import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { planService } from "@/src/services/server/plan.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const plans = await planService.getPlans();
    // Convert to client plan format
    const formattedPlans = plans.map((p) => ({
      id: p.slug,
      name: p.name,
      price: p.monthlyPrice, // standard default
      features: p.features,
      limits: {
        messages: p.messageLimit,
        bots: p.botLimit,
        storage: p.storageLimit,
        aiRequests: p.messageLimit, // proportional
      },
      description: p.description,
      isRecommended: p.isPopular,
    }));
    return successResponse(formattedPlans, "Plans retrieved successfully");
  } catch (error: any) {
    console.error("Plans GET error:", error);
    return errorResponse(error.message || "Failed to retrieve plans", 500);
  }
});
