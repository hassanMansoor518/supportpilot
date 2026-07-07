import { NextResponse } from "next/server";
import connectDb from "../../../lib/db"; // Ensure this matches your project alias for src folder

export async function GET() {
  try {
    await connectDb();
    return NextResponse.json({ message: "Database connected successfully!" }, { status: 200 });
  } catch (error) {
    console.error("DB Connection Error:", error);
    return NextResponse.json({ error: "Failed to connect to database", details: error }, { status: 500 });
  }
}
