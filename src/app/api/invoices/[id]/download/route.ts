import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { invoiceService } from "@/src/services/server/invoice.service";
import { successResponse, errorResponse, notFoundResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { params, user }) => {
  try {
    // Await params as required by Next.js 15
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return errorResponse("Invoice ID is required", 400);
    }

    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return notFoundResponse("Invoice not found");
    }

    // Verify ownership
    const subscription = invoice.subscription as any;
    if (subscription && subscription.user.toString() !== user.id) {
      return errorResponse("Unauthorized to download this invoice", 403);
    }

    const downloadUrl = await invoiceService.getDownloadUrl(id);

    return successResponse({ url: downloadUrl }, "Invoice download link generated successfully");
  } catch (error: any) {
    console.error("Invoice download GET error:", error);
    return errorResponse(error.message || "Failed to generate invoice download link", 500);
  }
});
