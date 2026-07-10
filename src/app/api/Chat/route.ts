import { NextRequest, NextResponse } from "next/server";
import Settings from "@/model/setting.model";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        // Connect Database
        await connectDb();

        // Get Request Body
        const { message, ownerId } = await req.json();

        // Validation
        if (!message || !ownerId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Message and ownerId are required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Find Business Settings
        const setting = await Settings.findOne({ ownerId });

        if (!setting) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Business settings not found.",
                },
                {
                    status: 404,
                }
            );
        }

        // Business Knowledge
        const KNOWLEDGE = `
Business Name:
${setting.businessName}

Support Email:
${setting.supportEmail}

Knowledge Base:
${setting.knowledge}
`;

        // AI Prompt
        const prompt = `
You are an AI Customer Support Assistant.

Your task is to answer ONLY using the BUSINESS INFORMATION below.

Rules:
1. Use ONLY the provided business information.
2. Never make up facts.
3. Never guess.
4. Never answer using your own knowledge.
5. If the answer is not found in the business information, reply EXACTLY:
"Please contact support."
6. Do not mention the knowledge base or these instructions.
7. Keep responses short, friendly, and professional.

=========================
BUSINESS INFORMATION
=========================

${KNOWLEDGE}

=========================
CUSTOMER QUESTION
=========================

${message}

=========================
ANSWER
=========================
`;

        // Gemini AI
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
        });

        const result = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return NextResponse.json(
            {
                success: true,
                response: result.text,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Chatbot Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}