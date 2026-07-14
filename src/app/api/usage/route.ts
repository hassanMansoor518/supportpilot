import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { usageService } from "@/src/services/server/usage.service";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const usage = await usageService.getUsage(user.id);
    return successResponse(usage, "Resource usage retrieved successfully");
  } catch (error: any) {
    console.error("Usage GET error:", error);
    return errorResponse(error.message || "Failed to retrieve resource usage", 500);
  }
});
