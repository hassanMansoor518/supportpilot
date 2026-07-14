import mongoose, { Document, Schema } from "mongoose";

export interface IUsage extends Document {
  user: mongoose.Types.ObjectId;
  messagesUsed: number;
  storageUsed: number; // in MB
  apiRequests: number;
  botsCreated: number;
  resetDate: Date;
  createdAt: Date;
  updatedAt: Date;
  dailyStats: { date: string; requests: number }[];
  botUsage: { botName: string; messages: number }[];
}

const usageSchema = new Schema<IUsage>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    messagesUsed: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 },
    apiRequests: { type: Number, default: 0 },
    botsCreated: { type: Number, default: 0 },
    resetDate: { type: Date, required: true },
    dailyStats: {
      type: [{ date: String, requests: Number }],
      default: [],
    },
    botUsage: {
      type: [{ botName: String, messages: Number }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

usageSchema.index({ user: 1 });

const UsageModel =
  mongoose.models.Usage ||
  mongoose.model<IUsage>("Usage", usageSchema);

export default UsageModel;
