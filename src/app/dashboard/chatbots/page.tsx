"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Plus, Settings2, Trash2, Code2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    try {
      const res = await axios.get("/api/chatbots");
      setChatbots(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chatbot?")) return;
    try {
      await axios.delete(`/api/chatbots/${id}`);
      fetchChatbots();
    } catch (err) {
      alert("Failed to delete chatbot.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading chatbots...</div>;
  }

  if (chatbots.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
          <Bot size={48} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">No chatbot created yet.</h2>
        <p className="mb-8 text-slate-500">Create your first AI assistant to start helping your customers.</p>
        <Link
          href="/dashboard/ChatbotSettings"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700"
        >
          <Plus size={20} />
          Create Your First Chatbot
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Chatbots</h1>
          <p className="text-slate-500">Manage your AI assistants and integrations.</p>
        </div>
        <Link
          href="/dashboard/ChatbotSettings"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Chatbot
        </Link>
      </div>

      <div className="grid gap-6">
        {chatbots.map((bot) => (
          <div key={bot._id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: bot.themeColor }}
              >
                <Bot size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{bot.chatbotName}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className={`flex items-center gap-1 ${bot.status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {bot.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span>•</span>
                  <span>{new Date(bot.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 md:mt-0">
              <Link
                href={`/dashboard/ChatbotSettings?id=${bot._id}`}
                className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
              >
                <Settings2 size={16} />
                Settings
              </Link>
              <Link
                href="/dashboard/Integrations"
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Code2 size={16} />
                Integration
              </Link>
              <button
                onClick={() => handleDelete(bot._id)}
                className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
