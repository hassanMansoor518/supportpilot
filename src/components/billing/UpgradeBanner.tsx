"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpgradeBanner() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 rounded-2xl p-6 md:p-8 border border-indigo-950 shadow-md font-sans text-white">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-xs font-bold text-indigo-300 mb-4 uppercase tracking-wider">
            <Zap size={12} className="fill-indigo-300" />
            Unlock Superpowers
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Unlock Advanced AI Models & Custom Branding
          </h3>
          <p className="text-sm text-indigo-200 mt-2 leading-relaxed font-medium">
            Get access to Claude 3.5 Sonnet, GPT-4o, advanced conversation analysis, and remove the "Powered by SupportPilot" badge from your widget.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs font-semibold text-indigo-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              10x Chatbots
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              1h Priority Support
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              API & Webhook Access
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/billing/subscription")}
          className="shrink-0 flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 text-indigo-950 font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer self-start lg:self-center"
        >
          View Premium Plans <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
