import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { stripeService } from "@/src/services/server/stripe.service";
import { checkoutSchema } from "@/src/validators/billing.validator";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";

export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Validation failed", 400, parsed.error.issues);
    }

    const { planSlug, billingCycle } = parsed.data;
    
    // Determine host dynamically or use CLIENT_URL env
    const origin = req.headers.get("origin") || process.env.CLIENT_URL || "http://localhost:3000";
    const successUrl = `${origin}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/dashboard/billing/subscription`;

    const checkoutUrl = await stripeService.createCheckoutSession(
      user.id,
      planSlug,
      billingCycle,
      successUrl,
      cancelUrl
    );

    return successResponse({ url: checkoutUrl }, "Checkout session generated successfully");
  } catch (error: any) {
    console.error("Checkout POST error:", error);
    return errorResponse(error.message || "Failed to create checkout session", 500);
  }
});
