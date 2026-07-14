import mongoose, { Document, Schema } from "mongoose";

export interface IChatbot extends Document {
  ownerId: string;
  chatbotKey: string;
  chatbotName: string;
  description?: string;
  welcomeMessage?: string;
  themeColor: string;
  aiModel: string;
  temperature: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const chatbotSchema = new Schema<IChatbot>(
  {
    ownerId: { type: String, required: true },
    chatbotKey: { type: String, required: true, unique: true },
    chatbotName: { type: String, required: true },
    description: { type: String },
    welcomeMessage: { type: String, default: "Hello! How can I help you today?" },
    themeColor: { type: String, default: "#0f3387" },
    aiModel: { type: String, default: "gemini-3.1-flash-lite" },
    temperature: { type: Number, default: 0.7 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);

chatbotSchema.index({ ownerId: 1 });
chatbotSchema.index({ chatbotKey: 1 });

const Chatbot = mongoose.models.Chatbot || mongoose.model<IChatbot>("Chatbot", chatbotSchema);

export default Chatbot;
