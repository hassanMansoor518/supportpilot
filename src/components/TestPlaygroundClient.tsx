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
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
        on ? "bg-indigo-600" : "bg-gray-200"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          on ? "translate-x-6" : "translate-x-1"
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

// ─── Initial messages ─────────────────────────────────────────────────────────

const INITIAL_MESSAGES: Message[] = [
  { id: "1", role: "user", content: "Hello, what can you help me with?", time: "11:30 AM" },
  {
    id: "2",
    role: "bot",
    content:
      "Hello! 👋 I can help you with information about our products, pricing, integrations, and general questions. How can I assist you today?",
    time: "11:30 AM",
  },
  { id: "3", role: "user", content: "What plans do you offer?", time: "11:31 AM" },
  {
    id: "4",
    role: "bot",
    content: `We offer three plans:\n\n• **Free Plan** – Basic features for getting started\n• **Pro Plan** – Advanced features and higher limits\n• **Business Plan** – For teams and advanced needs\n\nYou can check our Pricing page for full details.`,
    time: "11:31 AM",
  },
];

const QUICK_QUESTIONS = [
  "What is SupportPilot?",
  "How do I integrate the chatbot?",
  "What are your pricing plans?",
  "How does the Pro plan work?",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TestPlaygroundClient({ ownerId }: { ownerId?: string }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useLatestModel, setUseLatestModel] = useState(true);
  const [showSources, setShowSources] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
        body: JSON.stringify({ message: trimmed, ownerId }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.response ?? data.message ?? "Sorry, I could not get a response. Please try again.",
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
      <div className="flex gap-4 flex-1 min-h-0">

        {/* ── LEFT: Chat Panel ── */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm min-h-0 overflow-hidden">

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
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Trash2 size={14} />
              Clear Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {messages.map((msg) => (
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
        <div className="w-[240px] flex flex-col gap-4 flex-shrink-0">

          {/* Test Bot */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900">Test Bot</h3>
            <p className="text-xs text-gray-500 mt-0.5 mb-3">
              Select your chatbot and test its responses in real-time.
            </p>
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2.5 cursor-pointer hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <Bot size={15} className="text-indigo-600" />
                <span className="text-sm text-gray-800 font-medium">SupportPilot Bot</span>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Test Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Test Settings</h3>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-gray-700">Language</p>
              </div>
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer">
                <span className="text-xs text-gray-700">English (US)</span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-gray-700">Use Latest Model</p>
              <button onClick={() => setUseLatestModel((v) => !v)}>
                <Toggle on={useLatestModel} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-700">Show Sources</p>
              <button onClick={() => setShowSources((v) => !v)}>
                <Toggle on={showSources} />
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-amber-700">Tips</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Try different questions to see how your bot responds. Make sure your training data
              covers all important topics.
            </p>
          </div>

          {/* Quick Questions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Questions</h3>
            <div className="flex flex-col gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-xs text-gray-700 border border-gray-200 rounded-xl px-3 py-2.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
