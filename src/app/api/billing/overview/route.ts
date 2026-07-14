import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { billingService } from "@/src/services/server/billing.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const overview = await billingService.getOverview(user.id);
    return successResponse(overview, "Billing overview fetched successfully");
  } catch (error: any) {
    console.error("Overview GET error:", error);
    return errorResponse(error.message || "Failed to fetch billing overview", 500);
  }
});
