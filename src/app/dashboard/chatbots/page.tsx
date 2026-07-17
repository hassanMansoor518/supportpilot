"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Plus, Settings2, Trash2, Code2, AlertCircle, Loader2, Sparkles, Activity, PlayCircle, MessageSquare } from "lucide-react";
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
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-slate-500">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-lg font-medium animate-pulse">Loading your AI assistants...</p>
      </div>
    );
  }

  if (chatbots.length === 0) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-200">
            <Sparkles className="h-14 w-14 text-white" />
          </div>
        </div>

        <h2 className="mb-4 text-4xl font-extrabold text-slate-900 tracking-tight">Meet Your Future AI Agent</h2>
        <p className="mb-10 text-lg text-slate-500 max-w-md leading-relaxed font-medium">
          You haven't created a chatbot yet. Build your first intelligent assistant in minutes and start automating your customer support.
        </p>

        <Link
          href="/dashboard/chatbot-settings"
          className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 hover:bg-slate-800"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          Create First Chatbot
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8 font-sans">

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
            <Bot size={14} />
            <span>AI Fleet</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Your Chatbots
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Manage your AI assistants and monitor their performance.
          </p>
        </div>

        <Link
          href="/dashboard/chatbot-settings"
          className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-300"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          New Chatbot
        </Link>
      </div>

      {/* Grid of Chatbots */}
      <div className="grid gap-6 lg:grid-cols-2">
        {chatbots.map((bot) => (
          <div
            key={bot._id}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200"
          >
            {/* Top row: Avatar & Basic Info */}
            <div className="flex items-start justify-between mb-7">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm text-white"
                    style={{ backgroundColor: bot.themeColor || '#4f46e5' }}
                  >
                    <Bot size={28} />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${bot.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {bot.chatbotName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Activity size={14} className={bot.status === 'active' ? 'text-emerald-500' : 'text-slate-400'} />
                      {bot.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>Created {new Date(bot.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Quick Stats (Mocked for visual, you can connect to real data later) */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <MessageSquare size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Interactions</span>
                </div>
                <p className="text-xl font-bold text-slate-900">1,248</p>
              </div>
              <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-50">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <PlayCircle size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Playground</span>
                </div>
                <Link href={`/dashboard/test-playground?id=${bot._id}`} className="text-sm font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
                  Test Bot &rarr;
                </Link>
              </div>
            </div>

            {/* Bottom Row: Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <Link
                href={`/dashboard/chatbot-settings?id=${bot._id}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Settings2 size={16} />
                Settings
              </Link>
              <Link
                href="/dashboard/integrations"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Code2 size={16} />
                Install
              </Link>
              <button
                onClick={() => handleDelete(bot._id)}
                className="flex items-center justify-center p-2.5 rounded-xl border-2 border-transparent text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all"
                title="Delete Chatbot"
              >
                <Trash2 size={18} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
