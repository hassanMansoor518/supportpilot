"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bot, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewChatbotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    chatbotName: "",
    description: "",
    welcomeMessage: "Hello! How can I help you today?",
    themeColor: "#0f3387",
    aiModel: "gemini-3.1-flash-lite",
    temperature: 0.7,
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/chatbots", formData);
      router.push("/dashboard/chatbots");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create chatbot");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-8">
      <Link href="/dashboard/chatbots" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600">
        <ArrowLeft size={16} />
        Back to Chatbots
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create Chatbot</h1>
          <p className="text-slate-500">Configure your new AI assistant.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Chatbot Name *</label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.chatbotName}
            onChange={(e) => setFormData({ ...formData, chatbotName: e.target.value })}
            placeholder="e.g. Sales Assistant"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Description</label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. Handles sales inquiries"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Welcome Message</label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                className="h-12 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
                value={formData.themeColor}
                onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
              />
              <span className="text-sm text-slate-500 font-mono">{formData.themeColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">AI Model</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={formData.aiModel}
              onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
            >
              <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Temperature: {formData.temperature}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              className="w-full"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Creating..." : "Create Chatbot"}
          </button>
        </div>
      </form>
    </div>
  );
}
