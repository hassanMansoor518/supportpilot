import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import ChatHistory from "@/model/chatHistory.model";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get("ownerId");

        if (!ownerId) {
            return NextResponse.json({ success: false, message: "ownerId is required" }, { status: 400 });
        }

        await connectDb();
        const history = await ChatHistory.findOne({ ownerId });

        return NextResponse.json({
            success: true,
            messages: history?.messages ?? [],
        });
    } catch (error) {
        console.error("ChatHistory GET error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get("ownerId");

        if (!ownerId) {
            return NextResponse.json({ success: false, message: "ownerId is required" }, { status: 400 });
        }

        await connectDb();
        await ChatHistory.findOneAndUpdate(
            { ownerId },
            { messages: [], updatedAt: new Date() },
            { upsert: true }
        );

        return NextResponse.json({ success: true, message: "Chat history cleared." });
    } catch (error) {
        console.error("ChatHistory DELETE error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
