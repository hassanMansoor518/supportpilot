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
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Paperclip,
  Smile,
  Sparkles,
  CheckCheck,
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

function BotMessageContent({ content }: { content: string }) {
  const renderInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index} className="font-semibold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      elements.push(
        <pre
          key={`code-${index}`}
          className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-3 text-[0.8rem] leading-6 text-slate-100"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      index += 1;
      continue;
    }

    if (/^([-*] |• )/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^([-*] |• )/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^([-*] |• )/, ""));
        index += 1;
      }
      elements.push(
        <ul key={`list-${index}`} className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInlineText(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.includes("|") && line.split("|").length > 3) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes("|")) {
        rows.push(lines[index].split("|").slice(1, -1).map((cell) => cell.trim()));
        index += 1;
      }
      elements.push(
        <div key={`table-${index}`} className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <tbody className="divide-y divide-slate-100 bg-white/80">
              {rows.map((row, rowIndex) => (
                <tr key={`${row.join("-")}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-3 py-2 text-slate-700">
                      {renderInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim() && !lines[index].trim().startsWith("```") && !/^([-*] |• )/.test(lines[index].trim()) && !(lines[index].includes("|") && lines[index].split("|").length > 3)) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    elements.push(
      <p key={`paragraph-${index}`} className="text-[0.95rem] leading-7 text-slate-700">
        {renderInlineText(paragraphLines.join(" "))}
      </p>
    );
  }

  return <div className="space-y-2">{elements}</div>;
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${on ? "bg-indigo-600" : "bg-slate-200"}`}
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  );
}

function SettingCard({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm text-indigo-600">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

const QUICK_QUESTIONS = [
  "What is SupportPilot?",
  "How do I integrate the chatbot?",
  "What are your pricing plans?",
  "How does the Pro plan work?",
];

const SUGGESTED_REPLIES = [
  "🍔 Menu",
  "💲 Prices",
  "📍 Location",
  "🕒 Opening Hours",
  "🚚 Track Order",
  "👨‍💼 Contact Support",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TestPlaygroundClient({ ownerId }: { ownerId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [useLatestModel, setUseLatestModel] = useState(true);
  const [showSources, setShowSources] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messageIdRef = useRef(0);

  // ── Load chat history from DB on mount ─────────────────────────────────────
  useEffect(() => {
    if (!ownerId) {
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  function createMessageId() {
    messageIdRef.current += 1;
    return `msg-${messageIdRef.current}`;
  }

  // ── Send message ────────────────────────────────────────────────────────────
  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: createMessageId(),
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
        body: JSON.stringify({ message: trimmed, ownerId: ownerId?.trim(), saveHistory: true }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: createMessageId(),
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
        id: createMessageId(),
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Page Header ── */}

      <div className="flex items-start justify-between mb-5">
        <div className="ml-2 mt-3 flex gap-5 items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Test Playground</h1>
            <p className="mt-1 text-sm text-slate-500">
              Validate your chatbot experience in a polished workspace before launch.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 mt-4 mr-6 text-sm font-medium text-indigo-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-100">
          View Full Logs
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 gap-5 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white/85 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">SupportPilot Bot</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600">
                    Online
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">Ask anything to test your chatbot</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              disabled={isClearing || messages.length === 0}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isClearing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Clear Chat
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {isLoadingHistory && (
              <div className="flex h-32 items-center justify-center gap-2 text-sm text-slate-400">
                <Loader2 size={18} className="animate-spin" />
                Loading chat history...
              </div>
            )}

            {!isLoadingHistory && messages.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center gap-2 text-sm text-slate-400">
                <Bot size={28} className="text-slate-300" />
                <p>No messages yet. Start a conversation.</p>
              </div>
            )}

            {!isLoadingHistory && messages.length > 0 && (
              <div className="flex items-center justify-center">
                <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 shadow-sm">
                  Today
                </div>
              </div>
            )}

            {!isLoadingHistory &&
              messages.map((msg) => (
                <div key={msg.id} style={{ animation: "fadeIn 240ms ease-out" }}>
                  {msg.role === "user" ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>You</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="flex max-w-[72%] items-end gap-3">
                        <div className="rounded-[20px] rounded-br-[6px] bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-3 text-sm font-medium text-white shadow-[0_16px_35px_rgba(99,102,241,0.25)]">
                          {msg.content}
                        </div>
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 shadow-sm">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <CheckCheck size={12} />
                        Delivered
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-medium text-slate-500">SupportPilot Bot</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="flex max-w-[74%] items-start gap-3">
                        <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 shadow-sm ring-1 ring-indigo-100">
                          <Bot size={18} className="text-indigo-600" />
                        </div>
                        <div className="group relative rounded-[20px] rounded-bl-[6px] border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
                          <BotMessageContent content={msg.content} />
                          {msg.source === "knowledge_base" && (
                            <div className="mt-3 flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                              <BookOpen size={10} />
                              Knowledge Base
                            </div>
                          )}
                          <div className="absolute -right-2 top-3 flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100">
                            <button className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600" aria-label="Copy message">
                              <Copy size={13} />
                            </button>
                            <button className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600" aria-label="Regenerate response">
                              <RotateCcw size={13} />
                            </button>
                            <button className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600" aria-label="Like response">
                              <ThumbsUp size={13} />
                            </button>
                            <button className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600" aria-label="Dislike response">
                              <ThumbsDown size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-13 flex flex-wrap gap-2">
                        {SUGGESTED_REPLIES.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => sendMessage(reply)}
                            className="rounded-full border border-violet-200 bg-violet-50/70 px-3 py-1.5 text-[12px] font-medium text-violet-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-100 hover:shadow-md"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 shadow-sm ring-1 ring-indigo-100">
                  <Bot size={18} className="text-indigo-600" />
                </div>
                <div className="rounded-[20px] rounded-bl-[6px] border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-100 bg-white/70 px-6 py-4 backdrop-blur">
            <div className="rounded-[24px] border border-slate-200/80 bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
              <div className="flex items-end gap-2">
                
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about your support bot..."
                    rows={1}
                    className="w-full resize-none overflow-hidden bg-transparent py-2.5 text-[0.95rem] text-slate-700 placeholder:text-slate-400 outline-none"
                  />
                </div>
               
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:from-indigo-300 disabled:to-violet-300"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-xs text-slate-400">Press Enter to send</p>
                <p className="text-xs font-medium text-indigo-600">AI response ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Settings Panel ── */}
    <div className="
w-[310px]
h-full
flex
flex-col
gap-5
overflow-y-auto
px-1
pb-6
">


{/* Header */}

<div>

<h1 className="
text-[15px]
font-semibold
tracking-tight
text-gray-900
">
Test Bot
</h1>


<p className="
text-[12px]
text-gray-500
mt-1
leading-relaxed
">
Select your chatbot and test its
responses in real-time.
</p>


</div>



{/* Bot Dropdown */}


<div
className="
group
bg-white
border
border-gray-200
rounded-xl
px-3.5
py-3
flex
items-center
justify-between
hover:border-indigo-400
hover:shadow-sm
transition
cursor-pointer
"
>


<div className="flex items-center gap-3">


<div
className="
w-8
h-8
rounded-lg
bg-indigo-50
flex
items-center
justify-center
"
>

<Bot 
size={15}
className="text-indigo-600"
/>

</div>


<div>

<p className="
text-sm
font-medium
text-gray-800
">
SupportPilot Bot
</p>


<p className="
text-[11px]
text-gray-400
">
Gemini Flash
</p>


</div>


</div>



<ChevronDown
size={15}
className="text-gray-400 group-hover:text-indigo-500"
/>


</div>





{/* Settings */}


<div>


<h2 className="
text-[12px]
font-semibold
text-gray-800
mb-2
">
Test Settings
</h2>


<div
className="
rounded-xl
border
border-gray-200
bg-white
overflow-hidden
"
>



<div className="
flex
items-center
justify-between
px-4
py-3
border-b
border-gray-100
">


<span className="
text-xs
text-gray-600
">
Language
</span>


<button
className="
flex
items-center
gap-2
text-xs
bg-gray-50
text-gray-700
border
border-gray-200
rounded-md
px-2.5
py-1.5
"
>

English (US)

<ChevronDown size={12}/>

</button>


</div>





<div className="
flex
justify-between
items-center
px-4
py-3
border-b
border-gray-100
">

<span className="text-xs text-gray-600">
Use Latest Model
</span>


<Toggle on={useLatestModel}/>


</div>





<div className="
flex
justify-between
items-center
px-4
py-3
">


<span className="text-xs text-gray-600">
Show Sources
</span>


<Toggle on={showSources}/>


</div>


</div>


</div>







{/* Tips */}


<div
className="
rounded-xl
bg-indigo-50
border
border-indigo-100
p-4
"
>


<div className="
flex
gap-2
items-center
mb-2
">


<div
className="
w-6
h-6
rounded-md
bg-white
flex
items-center
justify-center
shadow-sm
"
>

<Lightbulb
size={13}
className="text-indigo-600"
/>

</div>


<span className="
text-xs
font-semibold
text-gray-800
">
Tips
</span>


</div>


<p
className="
text-[11px]
text-gray-600
leading-relaxed
"
>
Try different questions to see how your bot responds.
Make sure your training data covers important topics.
</p>


</div>








{/* Questions */}


<div>


<h2
className="
text-[12px]
font-semibold
text-gray-800
mb-2
"
>
Quick Questions
</h2>


<div className="space-y-2">


{
QUICK_QUESTIONS.map((q)=>(
<button
key={q}
onClick={()=>sendMessage(q)}
className="
w-full
text-left
px-3.5
py-2.5
rounded-lg
border
border-gray-200
bg-white
text-xs
text-gray-600
hover:text-indigo-600
hover:border-indigo-300
hover:bg-indigo-50/50
transition
"
>

{q}

</button>
))
}


</div>


</div>



</div>
      </div>
    </div>
  );
}

