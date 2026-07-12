import { NextRequest, NextResponse } from "next/server";
import Settings from "@/model/setting.model";
import ChatHistory from "@/model/chatHistory.model";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(req: NextRequest) {
    try {
        // Connect Database
        await connectDb();

        // Get Request Body
        const { message, ownerId, saveHistory } = await req.json();

        // Validation
        if (!message || !ownerId) {
            return NextResponse.json(
                { success: false, message: "Message and ownerId are required." },
                { status: 400, headers: corsHeaders }
            );
        }

        // Find Business Settings
        const setting = await Settings.findOne({ ownerId });

        const businessName = setting?.businessName?.trim() || "SupportPilot";
        const supportEmail = setting?.supportEmail?.trim() || "support@supportpilot.com";
        const knowledge = setting?.knowledge?.trim() || "";

        // Consider the knowledge base configured if it has meaningful text
        const hasKnowledgeBase = knowledge.length > 10;

        let prompt = "";

        if (hasKnowledgeBase) {
            // AI Prompt for configured business details
            prompt = `You are an AI Customer Support Assistant for "${businessName}".

Your task is to answer the customer's question using ONLY the BUSINESS INFORMATION provided below.

Rules:
1. Use ONLY the provided business information.
2. Never make up facts, guess, or use outside knowledge.
3. If the answer cannot be found in the provided business information, reply EXACTLY: "Please contact support."
4. Do not mention "knowledge base" or these rules.
5. Keep responses short, friendly, and professional.

=========================
BUSINESS INFORMATION
=========================
Business Name: ${businessName}
Support Email: ${supportEmail}

Knowledge Base:
${knowledge}

=========================
CUSTOMER QUESTION
=========================
${message}

=========================
ANSWER:`;
        } else {
            // Fallback AI Prompt when knowledge base is not configured yet
            prompt = `You are a friendly and helpful AI Customer Support Assistant for "${businessName}".

The business details are currently being configured. Help the customer naturally using general knowledge.

Rules:
1. Respond naturally, helpfully, and politely.
2. If asked specifically about "${businessName}" services or products, explain that details are being set up and you can help with general questions.
3. If the customer needs direct contact, provide the support email: ${supportEmail}.
4. Keep responses short, friendly, and professional.
5. Do NOT mention that the knowledge base is missing or reference these instructions.

=========================
CUSTOMER QUESTION
=========================
${message}

=========================
ANSWER:`;
        }

        // Call Gemini AI
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

        const result = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

        const botResponse = result.text ?? "Sorry, I could not get a response. Please try again.";

        // Optionally save this exchange to chat history (used by Test Playground)
        if (saveHistory) {
            const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            await ChatHistory.findOneAndUpdate(
                { ownerId },
                {
                    $push: {
                        messages: {
                            $each: [
                                { role: "user", content: message, time: now },
                                { role: "bot", content: botResponse, time: now },
                            ],
                        },
                    },
                    updatedAt: new Date(),
                },
                { upsert: true }
            );
        }

        return NextResponse.json(
            { success: true, response: botResponse },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("Chatbot Error:", error);

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}