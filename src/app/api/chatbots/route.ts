import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";
import Chatbot from "@/src/model/chatbot.model";
import { usageRepository } from "@/src/repositories/usage.repository";
import { subscriptionService } from "@/src/services/server/subscription.service";

// GET all chatbots for the user
export const GET = withAuth(async (req: NextRequest, { user }) => {
  try {
    const [chatbots, usage] = await Promise.all([
      Chatbot.find({ ownerId: user.id }).sort({ createdAt: -1 }),
      usageRepository.findOrCreateByUserId(user.id),
    ]);

    // Merge per-bot message count from usage.botUsage
    const botUsageMap = new Map<string, number>();
    (usage.botUsage || []).forEach(
      ({ botName, messages }: { botName: string; messages: number }) => {
        botUsageMap.set(botName, messages);
      }
    );

    const enriched = chatbots.map((bot) => ({
      ...bot.toObject(),
      messageCount: botUsageMap.get(bot.chatbotName) ?? 0,
    }));

    return successResponse(enriched, "Chatbots retrieved successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to retrieve chatbots", 500);
  }
});

// POST create a new chatbot
export const POST = withAuth(async (req: NextRequest, { user }) => {
  try {
    const body = await req.json();
    const { chatbotName, description, welcomeMessage, themeColor, aiModel, temperature, status } = body;

    if (!chatbotName) {
      return errorResponse("Chatbot name is required", 400);
    }

    // Check plan limits
    const usage = await usageRepository.findOrCreateByUserId(user.id);
    const sub = await subscriptionService.getCurrentSubscription(user.id);
    const plan = (sub as any).plan;
    const botLimit = plan?.botLimit ?? 3;

    if (usage.botsCreated >= botLimit) {
      return errorResponse("You have reached your chatbot limit. Please upgrade your plan.", 403);
    }

    // Generate unique chatbot key
    const chatbotKey = "cb_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

    const newChatbot = new Chatbot({
      ownerId: user.id,
      chatbotKey,
      chatbotName,
      description,
      welcomeMessage: welcomeMessage || "Hello! How can I help you today?",
      themeColor: themeColor || "#0f3387",
      aiModel: aiModel || "gemini-3.1-flash-lite",
      temperature: temperature !== undefined ? temperature : 0.7,
      status: status || "active",
    });

    await newChatbot.save();

    // Increment botsCreated in usage
    await usageRepository.setBotsCreated(user.id, usage.botsCreated + 1);

    return successResponse(newChatbot, "Chatbot created successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to create chatbot", 500);
  }
});
