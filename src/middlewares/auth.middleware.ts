import { getServerSession } from "next-auth";
import authOptions from "../lib/auth";
import { unauthorizedResponse } from "../lib/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import connectDb from "../lib/db";

export type AuthenticatedHandler = (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> | Record<string, string>; user: { id: string; email: string; name: string; role: string } }
) => Promise<NextResponse>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextRequest, context: { params: Promise<Record<string, string>> | Record<string, string> }) => {
    try {
      await connectDb();
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
        return unauthorizedResponse("You must be logged in to access this resource");
      }

      const user = {
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.name || "",
        role: session.user.role || "user",
      };

      return await handler(req, { ...context, user });
    } catch {
      return unauthorizedResponse("Authentication failed");
    }
  };
}
