"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Code,
  Copy,
  ClipboardList,
  RefreshCcw,
  ChevronRight,
  Eye,
  Lock,
  RotateCw,
  X,
  MessageSquare,
  Sparkles,
  Bot,
  CheckCircle2,
  ArrowUpRight,
  Plus
} from "lucide-react";

export default function IntegrationsContent({ ownerId }: { ownerId: string }) {
  const [copiedKeys, setCopiedKeys] = useState<{ [key: string]: boolean }>({});
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchChatbots();
  }, []);

  const handleCopy = (embedCode: string, chatbotKey: string) => {
    navigator.clipboard.writeText(embedCode);
    setCopiedKeys((prev) => ({ ...prev, [chatbotKey]: true }));
    setTimeout(() => {
      setCopiedKeys((prev) => ({ ...prev, [chatbotKey]: false }));
    }, 2000);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading integrations...</div>;
  }

  if (chatbots.length === 0) {
    return (
      <div className="mx-auto mt-5 max-w-[1160px] pb-10">
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            <Bot size={48} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">You haven't created a chatbot yet.</h2>
          <p className="mb-8 text-slate-500">Create a chatbot to get your integration embed code.</p>
          <Link
            href="/dashboard/chatbot-settings"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-slate-900/20 active:scale-95"
          >
            <Plus size={20} />
            Create Chatbot
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="mx-auto mt-5 max-w-[1160px] pb-10">
      <div className="mb-8 rounded-[30px] border border-slate-200/70 bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/50 p-5 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Sparkles size={16} />
              New embed experience
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Embed ChatBot</h1>
            <p className="mt-2 text-[15px] leading-7 text-slate-600">
              Add the chat widget to your website in just a few steps with a polished, production-ready setup.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Ready to launch
            </div>
            <p className="mt-1 text-xs text-slate-500">Works with your current embed code</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {chatbots.map((bot) => {
          const embedCode = `<script\n  src="https://supportpilot-lilac.vercel.app/chatBot.js"\n  data-chatbot-key="${bot.chatbotKey}">\n</script>`;
          const isCopied = copiedKeys[bot.chatbotKey];

          return (
            <div key={bot.chatbotKey} className="rounded-[28px] border border-slate-200/80 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
                    <Code size={18} />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-semibold text-slate-900">{bot.chatbotName}</h2>
                    <p className="text-sm text-slate-500">
                      Status: {bot.status} | Key: <span className="font-mono text-xs">{bot.chatbotKey}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(embedCode, bot.chatbotKey)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50"
                >
                  <Copy size={16} className={isCopied ? "text-emerald-500" : "text-slate-500"} />
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>

              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-[12px] font-medium text-slate-400">
                  <span>HTML</span>
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300">Snippet</span>
                </div>
                <pre className="overflow-x-auto p-5 text-[13px] leading-7 font-mono text-slate-300">
                  <div className="flex gap-4">
                    <div className="select-none text-right text-slate-500">
                      1<br />2<br />3<br />4
                    </div>
                    <div>
                      <span className="text-pink-400">&lt;script</span>
                      <br />
                      <span className="ml-4 text-blue-300">src</span>
                      <span className="text-slate-500">=</span>
                      <span className="text-emerald-400">"https://supportpilot-lilac.vercel.app/chatBot.js"</span>
                      <br />
                      <span className="ml-4 text-blue-300">data-chatbot-key</span>
                      <span className="text-slate-500">=</span>
                      <span className="text-emerald-400">"{bot.chatbotKey}"</span>
                      <span className="text-pink-400">&gt;</span>
                      <br />
                      <span className="text-pink-400">&lt;/script&gt;</span>
                    </div>
                  </div>
                </pre>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            {
              icon: <ClipboardList size={18} />,
              title: "1. Copy the embed script",
              desc: "Use the snippet above to get started",
            },
            {
              icon: <Code size={18} />,
              title: "2. Paste it before the closing body tag",
              desc: "Place it on the pages where you want the widget",
            },
            {
              icon: <RefreshCcw size={18} />,
              title: "3. Reload your website",
              desc: "Your chatbot will appear instantly",
            },
          ].map((step, index) => (
            <div key={step.title} className="flex items-start gap-3 rounded-[22px] border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
                {step.icon}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">{step.title}</div>
                <div className="mt-1 text-[12px] leading-6 text-slate-500">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200/80 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] mt-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <Eye size={18} />
          </div>
          <div>
            <h2 className="text-[17px] font-semibold text-slate-900">Live Preview</h2>
            <p className="text-sm text-slate-500">A realistic preview of how the widget will appear on your site.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 shadow-inner">
          <div className="flex items-center gap-4 border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex flex-1 justify-center min-w-0">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-500 max-w-full">
                <Lock size={12} className="flex-shrink-0" />
                <span className="truncate">Your-website.com</span>
              </div>
            </div>
            <RotateCw size={16} className="text-slate-400" />
          </div>

          <div className="relative h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.08),_transparent_30%),linear-gradient(180deg,_#ffffff_0%,_#f8faff_100%)] p-4 sm:p-8">
            <div className="max-w-lg">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                <Bot size={14} />
                AI assistant ready
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Your website goes here</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                The widget appears as a polished floating support experience with a premium, lightweight UI.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="h-3 w-36 rounded-full bg-slate-200" />
                <div className="h-3 w-24 rounded-full bg-slate-200" />
                <div className="h-3 w-28 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-4 rounded-[28px] max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)]">
              <div className="w-full max-w-[320px] sm:w-[320px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between bg-slate-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                      <Bot size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Customer Support</div>
                      <div className="text-[11px] text-slate-400">Online now</div>
                    </div>
                  </div>
                  <X size={16} className="cursor-pointer text-slate-400 hover:text-white" />
                </div>
                <div className="space-y-3 bg-slate-50/70 p-4">
                  <div className="flex items-start">
                    <div className="max-w-[80%] rounded-[18px] rounded-tl-none bg-white px-4 py-2.5 text-[13px] leading-6 text-slate-700 shadow-sm">
                      Hi! How can I help you today?
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="max-w-[80%] rounded-[18px] rounded-tr-none bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-[13px] leading-6 text-white shadow-sm">
                      What is the return policy?
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
                <MessageSquare size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
