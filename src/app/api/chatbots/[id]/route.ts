import { NextRequest } from "next/server";
import { withAuth } from "@/src/middlewares/auth.middleware";
import { successResponse, errorResponse } from "@/src/lib/apiResponse";
import Chatbot from "@/src/model/chatbot.model";
import { usageRepository } from "@/src/repositories/usage.repository";

export const GET = withAuth(async (req: NextRequest, { user, params }) => {
  try {
    const { id } = params;
    const chatbot = await Chatbot.findOne({ _id: id, ownerId: user.id });

    if (!chatbot) {
      return errorResponse("Chatbot not found", 404);
    }

    return successResponse(chatbot, "Chatbot retrieved successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to retrieve chatbot", 500);
  }
});

export const PUT = withAuth(async (req: NextRequest, { user, params }) => {
  try {
    const { id } = params;
    const body = await req.json();
    
    const updated = await Chatbot.findOneAndUpdate(
      { _id: id, ownerId: user.id },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return errorResponse("Chatbot not found", 404);
    }

    return successResponse(updated, "Chatbot updated successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to update chatbot", 500);
  }
});

export const DELETE = withAuth(async (req: NextRequest, { user, params }) => {
  try {
    const { id } = params;

    const chatbot = await Chatbot.findOneAndDelete({ _id: id, ownerId: user.id });

    if (!chatbot) {
      return errorResponse("Chatbot not found or you don't have permission to delete it", 404);
    }

    // Decrement botsCreated in usage
    const usage = await usageRepository.findOrCreateByUserId(user.id);
    if (usage.botsCreated > 0) {
      await usageRepository.setBotsCreated(user.id, usage.botsCreated - 1);
    }

    return successResponse(null, "Chatbot deleted successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to delete chatbot", 500);
  }
});
