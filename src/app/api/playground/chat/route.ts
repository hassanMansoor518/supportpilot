/**
 * @deprecated
 * This route is no longer the primary playground endpoint.
 * All requests are forwarded to /api/Chat which contains the full RAG + Gemini pipeline.
 *
 * The TestPlayground UI now calls /api/Chat directly.
 * This file is kept only for backward compatibility.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward the request to the main Chat API
    const chatRes = await fetch(new URL("/api/Chat", req.url).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await chatRes.json();

    // Normalize: Chat API returns `response`, playground client expects `reply`
    // (kept for any legacy callers that still use this route)
    return NextResponse.json({
      ...data,
      reply: data.response ?? data.reply,
    }, { status: chatRes.status });

  } catch (error) {
    console.error("[playground/chat proxy] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
