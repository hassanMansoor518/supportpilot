import { NextRequest, NextResponse } from "next/server";
import Chatbot from "@/src/model/chatbot.model";
import connectDb from "@/src/lib/db";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { chatbotKey } = await req.json();

        if (!chatbotKey) {
            return NextResponse.json({ success: false, message: "chatbotKey is required" }, { status: 400, headers: corsHeaders });
        }

        const chatbot = await Chatbot.findOne({ chatbotKey });
        if (!chatbot) {
            return NextResponse.json({ success: false, message: "Chatbot not found" }, { status: 404, headers: corsHeaders });
        }

        if (chatbot.status !== "active") {
            return NextResponse.json({ success: false, message: "Chatbot is inactive" }, { status: 403, headers: corsHeaders });
        }

        return NextResponse.json({
            success: true,
            data: {
                title: chatbot.chatbotName,
                welcomeMessage: chatbot.welcomeMessage,
                themeColor: chatbot.themeColor,
            }
        }, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error("Chatbot init error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500, headers: corsHeaders });
    }
}
