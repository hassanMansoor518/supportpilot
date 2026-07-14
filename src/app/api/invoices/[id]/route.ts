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
      return errorResponse("Unauthorized to view this invoice", 403);
    }

    const formattedInvoice = {
      id: invoice.stripeInvoiceId || invoice._id.toString(),
      date: invoice.paidAt?.toISOString().split("T")[0] || invoice.createdAt.toISOString().split("T")[0],
      amount: invoice.total / 100,
      tax: invoice.tax / 100,
      status: invoice.status,
      paymentMethod: {
        brand: "visa",
        last4: "4242",
      },
      pdfUrl: invoice.invoicePdf || "#",
    };

    return successResponse(formattedInvoice, "Invoice details retrieved successfully");
  } catch (error: any) {
    console.error("Invoice GET by ID error:", error);
    return errorResponse(error.message || "Failed to retrieve invoice details", 500);
  }
});
