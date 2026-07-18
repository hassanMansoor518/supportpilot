"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Plus,
  Settings2,
  Trash2,
  Code2,
  Loader2,
  Sparkles,
  PlayCircle,
  MessageSquare,
  Zap,
  MoreVertical,
  ExternalLink,
  Globe,
  Calendar,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchChatbots();
  }, []);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
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
    } catch {
      alert("Failed to delete chatbot.");
    }
  };

  /* ─── Loading ─────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
          </div>
        </div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading your AI assistants…
        </p>
      </div>
    );
  }

  /* ─── Empty State ─────────────────────────────────────────────────────── */
  if (chatbots.length === 0) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 rounded-[2rem] blur-2xl opacity-15 scale-110" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-300/40">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mb-3 text-3xl font-extrabold text-slate-900 tracking-tight">
          Build Your First AI Agent
        </h2>
        <p className="mb-8 max-w-sm text-[15px] text-slate-500 leading-relaxed">
          Create an intelligent chatbot, train it on your data, and embed it anywhere in minutes.
        </p>
        <Link
          href="/dashboard/chatbot-settings"
          className="group inline-flex items-center gap-2.5 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-300/40 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-400/40"
        >
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          Create Chatbot
        </Link>
      </div>
    );
  }

  /* ─── Main View ───────────────────────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-6xl space-y-8 font-sans">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-600">
            <Bot size={11} />
            AI Fleet
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Your Chatbots
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {chatbots.length} assistant{chatbots.length !== 1 ? "s" : ""} deployed
          </p>
        </div>

        <Link
          href="/dashboard/chatbot-settings"
          className="group self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <Plus size={16} className="transition-transform group-hover:rotate-90" />
          New Chatbot
        </Link>
      </div>

      {/* ── Chatbot Grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {chatbots.map((bot) => {
          const color = bot.themeColor || "#4f46e5";
          const isActive = bot.status === "active";

          return (
            <div
              key={bot._id}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80 hover:border-slate-300 overflow-hidden"
            >
              {/* Color bar accent */}
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />

              <div className="flex flex-col flex-1 p-5 gap-4">

                {/* ── Top Row ── */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        <Bot size={20} />
                      </div>
                      {/* Status dot */}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${isActive ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                      />
                    </div>

                    {/* Name & status */}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate leading-tight">
                        {bot.chatbotName}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                          />
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Kebab Menu ── */}
                  <div ref={menuRef} className="relative">
                    <button
                      onClick={() => {
                        setOpenMenuId(openMenuId === bot._id ? null : bot._id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <MoreVertical size={15} />
                    </button>

                    {openMenuId === bot._id && (
                      <div
                        className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60 py-1.5 overflow-hidden"
                      >
                        <Link
                          href={`/dashboard/chatbot-settings?id=${bot._id}`}
                          onClick={() => setOpenMenuId(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Settings2 size={13} className="text-slate-400" />
                          Settings
                        </Link>
                        <Link
                          href="/dashboard/integrations"
                          onClick={() => setOpenMenuId(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Code2 size={13} className="text-slate-400" />
                          Install Widget
                        </Link>
                        <Link
                          href={`/dashboard/test-playground?id=${bot._id}`}
                          onClick={() => setOpenMenuId(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <PlayCircle size={13} className="text-slate-400" />
                          Test in Playground
                        </Link>
                        <div className="my-1 border-t border-slate-100" />
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            handleDelete(bot._id);
                          }}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Meta ── */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Globe size={11} />
                    {bot.aiModel || "Gemini"}
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(bot.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* ── Stat Pills ── */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-0.5 rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-3">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                      <MessageSquare size={11} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Messages
                      </span>
                    </div>
                    <p className="text-lg font-extrabold text-slate-900 leading-none">
                      {(bot.messageCount ?? 0).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="flex flex-col gap-0.5 rounded-xl px-3.5 py-3 border"
                    style={{
                      backgroundColor: color + "10",
                      borderColor: color + "25",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5" style={{ color }}>
                      <Zap size={11} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Creativity
                      </span>
                    </div>
                    <p className="text-lg font-extrabold leading-none" style={{ color }}>
                      {((bot.temperature ?? 0.7) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* ── Quick Actions ── */}
                <div className="flex items-center gap-2 pt-1 mt-auto">
                  <Link
                    href={`/dashboard/chatbot-settings?id=${bot._id}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <Settings2 size={13} />
                    Settings
                  </Link>

                  <Link
                    href={`/dashboard/test-playground?id=${bot._id}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  >
                    <PlayCircle size={13} />
                    Test
                  </Link>

                  <Link
                    href="/dashboard/integrations"
                    className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                    title="Install Widget"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </div>

              </div>
            </div>
          );
        })}

        {/* ── Add New Chatbot Card ── */}
        <Link
          href="/dashboard/chatbot-settings"
          className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center transition-all hover:border-indigo-300 hover:bg-indigo-50/30 min-h-[260px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 transition group-hover:border-indigo-400 group-hover:text-indigo-500">
            <Plus size={20} className="transition-transform group-hover:rotate-90" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-600 group-hover:text-indigo-700 transition-colors">
              Add New Chatbot
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Deploy another AI assistant
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Get started <ChevronRight size={11} />
          </span>
        </Link>
      </div>
    </div>
  );
}
