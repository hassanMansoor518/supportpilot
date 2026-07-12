"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  BookOpen,
  ExternalLink,
  Trash2,
  Send,
  ChevronDown,
  Lightbulb,
  Loader2,
  Globe,
  Cpu,
  Database,
  ArrowRight,
  Zap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  source?: "knowledge_base" | "fallback";
  id: string;
  role: "user" | "bot";
  content: string;
  time: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${on ? "bg-indigo-600" : "bg-gray-200"
        }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-6" : "translate-x-1"
          }`}
      />
    </div>
  );
}

// Renders bot message content (supports **bold** and newlines)
function BotMessageContent({ content }: { content: string }) {
  return (
    <div className="text-sm text-gray-700 leading-relaxed">
      {content.split("\n").map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className={line === "" ? "mt-2" : ""}>
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="font-semibold text-gray-900">
                  {part}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

const QUICK_QUESTIONS = [
  "What is SupportPilot?",
  "How do I integrate the chatbot?",
  "What are your pricing plans?",
  "How does the Pro plan work?",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TestPlaygroundClient({ ownerId }: { ownerId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [useLatestModel, setUseLatestModel] = useState(true);
  const [showSources, setShowSources] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ── Load chat history from DB on mount ─────────────────────────────────────
  useEffect(() => {
    if (!ownerId) {
      setIsLoadingHistory(false);
      return;
    }

    async function loadHistory() {
      try {
        setIsLoadingHistory(true);
        const res = await fetch(`/api/chat-history?ownerId=${ownerId}`);
        const data = await res.json();
        if (data.success && data.messages.length > 0) {
          const loaded: Message[] = data.messages.map(
            (m: { role: "user" | "bot"; content: string; time: string }, i: number) => ({
              id: `history-${i}`,
              role: m.role,
              content: m.content,
              time: m.time,
            })
          );
          setMessages(loaded);
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadHistory();
  }, [ownerId]);

  // ── Auto-scroll to bottom ───────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Send message ────────────────────────────────────────────────────────────
  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      time: getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/Chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, ownerId, saveHistory: true }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          data.response ??
          data.message ??
          "Sorry, I could not get a response. Please try again.",
        time: getTime(),
        source: data.source,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Something went wrong. Please check your connection and try again.",
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  // ── Clear chat from DB ──────────────────────────────────────────────────────
  async function clearChat() {
    if (!ownerId) {
      setMessages([]);
      return;
    }
    try {
      setIsClearing(true);
      await fetch(`/api/chat-history?ownerId=${ownerId}`, { method: "DELETE" });
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat history", err);
    } finally {
      setIsClearing(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test Playground</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Test your chatbot&apos;s responses in real-time before integrating.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-300 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
          View Full Logs
          <ExternalLink size={14} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex gap-5 flex-1 min-h-0 overflow-hidden">

        {/* ── LEFT: Chat Panel ── */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm min-h-0 overflow-hidden">

          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Bot size={20} className="text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">SupportPilot Bot</span>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Ask anything to test your chatbot</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              disabled={isClearing || messages.length === 0}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isClearing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Clear Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

            {/* Loading history spinner */}
            {isLoadingHistory && (
              <div className="flex items-center justify-center h-32 gap-2 text-gray-400 text-sm">
                <Loader2 size={18} className="animate-spin" />
                Loading chat history...
              </div>
            )}

            {/* Empty state */}
            {!isLoadingHistory && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400 text-sm">
                <Bot size={28} className="text-gray-300" />
                <p>No messages yet. Start a conversation!</p>
              </div>
            )}

            {!isLoadingHistory && messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "user" ? (
                  /* User message */
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">You • {msg.time}</span>
                    <div className="flex items-end gap-2">
                      <div className="bg-indigo-50 border border-indigo-100 text-gray-800 text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[75%]">
                        {msg.content}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Bot message */
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs text-gray-400">SupportPilot Bot • {msg.time}</span>
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={14} className="text-indigo-600" />
                      </div>
                      <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[80%]">
                        <BotMessageContent content={msg.content} />
                        {msg.source === "knowledge_base" && (
                          <div className="mt-2 flex items-center gap-1">
                            <BookOpen size={10} className="text-indigo-400" />
                            <span className="text-[10px] text-indigo-400 font-medium">Knowledge Base</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-indigo-600" />
                </div>
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 pl-1">Press Enter to send</p>
          </div>
        </div>

        {/* ── RIGHT: Settings Panel ── */}
        <div className="w-[320px] flex flex-col gap-3 flex-shrink-0 overflow-y-auto pr-1 h-full pb-4">

          {/* ── Bot Status Card ── */}
          <div className="rounded-2xl border border-indigo-100 shadow-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)" }}>
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-semibold text-indigo-200 uppercase tracking-widest">Active Bot</span>
                <span className="flex items-center gap-1.5 bg-white/15 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">SupportPilot Bot</p>
                  <p className="text-xs text-indigo-200 mt-0.5">AI-powered · Gemini Flash</p>
                </div>
              </div>
            </div>
            <div className="mx-5 mb-4 bg-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors">
              <span className="text-xs text-white font-medium">Switch Bot</span>
              <ChevronDown size={14} className="text-white/60" />
            </div>
          </div>

          {/* ── Settings Card ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
              <Cpu size={14} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-800">Test Settings</span>
            </div>
            <div className="divide-y divide-gray-50/80">

              {/* Language */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Globe size={14} className="text-sky-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-none">Language</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Response locale</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                  <span className="text-[11px] font-semibold text-gray-600 group-hover:text-indigo-600">EN</span>
                  <ChevronDown size={11} className="text-gray-400 group-hover:text-indigo-400" />
                </div>
              </div>

              {/* Latest Model */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Zap size={14} className="text-violet-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-none">Latest Model</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Newest AI version</p>
                  </div>
                </div>
                <button onClick={() => setUseLatestModel((v) => !v)}>
                  <Toggle on={useLatestModel} />
                </button>
              </div>

              {/* Show Sources */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Database size={14} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-none">Show Sources</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Knowledge origin badge</p>
                  </div>
                </div>
                <button onClick={() => setShowSources((v) => !v)}>
                  <Toggle on={showSources} />
                </button>
              </div>

            </div>
          </div>

          {/* ── Quick Questions ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
              <BookOpen size={14} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-800">Quick Questions</span>
              <span className="ml-auto text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                {QUICK_QUESTIONS.length}
              </span>
            </div>
            <div className="p-3 space-y-1.5">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="group w-full flex items-center gap-3 text-left bg-gray-50/80 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl px-3.5 py-3 transition-all duration-150"
                >
                  <span className="w-5 h-5 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-indigo-600 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-[12px] text-gray-600 group-hover:text-indigo-700 font-medium leading-tight flex-1 transition-colors">
                    {q}
                  </span>
                  <ArrowRight size={12} className="text-gray-300 group-hover:text-indigo-400 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Tips Banner ── */}
          <div className="rounded-2xl border border-amber-100 overflow-hidden flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" }}>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-xl bg-amber-200 flex items-center justify-center">
                  <Lightbulb size={13} className="text-amber-700" />
                </div>
                <span className="text-sm font-bold text-amber-900">Pro Tips</span>
              </div>
              <div className="space-y-2">
                {[
                  "Ask edge-case questions to find bot gaps.",
                  "Add FAQs to improve knowledge accuracy.",
                  "Clear chat to start a clean test session.",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-bold text-amber-800">{i + 1}</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

