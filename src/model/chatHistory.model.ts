import mongoose from "mongoose";

interface IChatMessage {
    role: "user" | "bot";
    content: string;
    time: string;
}

interface IChatHistory {
    ownerId: string;
    messages: IChatMessage[];
    updatedAt?: Date;
}

const chatMessageSchema = new mongoose.Schema<IChatMessage>({
    role: { type: String, enum: ["user", "bot"], required: true },
    content: { type: String, required: true },
    time: { type: String, required: true },
}, { _id: false });

const chatHistorySchema = new mongoose.Schema<IChatHistory>({
    ownerId: { type: String, required: true, unique: true },
    messages: { type: [chatMessageSchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
});

const ChatHistory =
    mongoose.models.ChatHistory ||
    mongoose.model<IChatHistory>("ChatHistory", chatHistorySchema);

export default ChatHistory;
