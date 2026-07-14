import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { invoiceService } from "@/src/services/server/invoice.service";
import { invoiceQuerySchema } from "@/src/validators/billing.validator";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const { searchParams } = new URL(req.url);
    const queryObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryObj[key] = value;
    });

    const parsed = invoiceQuerySchema.safeParse(queryObj);
    if (!parsed.success) {
      return errorResponse("Validation failed", 400, parsed.error.issues);
    }

    const filters = {
      userId: user.id,
      ...parsed.data,
    };

    const result = await invoiceService.getInvoices(filters);

    // Format for client compatibility
    const formattedInvoices = result.invoices.map((inv) => ({
      id: inv.stripeInvoiceId || inv._id.toString(),
      date: inv.paidAt?.toISOString().split("T")[0] || inv.createdAt.toISOString().split("T")[0],
      amount: inv.total / 100,
      tax: inv.tax / 100,
      status: inv.status,
      paymentMethod: {
        brand: "visa",
        last4: "4242",
      },
      pdfUrl: inv.invoicePdf || "#",
    }));

    return successResponse(
      {
        invoices: formattedInvoices,
        total: result.total,
        page: result.page,
        pages: result.pages,
      },
      "Invoices retrieved successfully"
    );
  } catch (error: any) {
    console.error("Invoices GET error:", error);
    return errorResponse(error.message || "Failed to retrieve invoices", 500);
  }
});
