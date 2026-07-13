"use client";

import React from "react";
import { useBilling } from "@/src/hooks/useBilling";
import { Sparkles, RefreshCw } from "lucide-react";

export default function BillingHeader() {
  const { resetDemoState, isResetting } = useBilling();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100 mb-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your subscription, payment methods, usage, and invoices.
        </p>
      </div>

      {/* Demo Controls */}
      <div className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200/60 text-xs self-start">
        <span className="px-2 text-gray-500 font-medium flex items-center gap-1">
          <Sparkles size={12} className="text-indigo-600 animate-pulse" />
          Demo States:
        </span>
        <button
          onClick={() => resetDemoState("new")}
          disabled={isResetting}
          className="px-2.5 py-1 rounded-lg font-medium bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-100 transition-all active:scale-95 disabled:opacity-50"
        >
          First-time
        </button>
        <button
          onClick={() => resetDemoState("free")}
          disabled={isResetting}
          className="px-2.5 py-1 rounded-lg font-medium bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-100 transition-all active:scale-95 disabled:opacity-50"
        >
          Free Plan
        </button>
        <button
          onClick={() => resetDemoState("pro")}
          disabled={isResetting}
          className="px-2.5 py-1 rounded-lg font-medium bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-100 transition-all active:scale-95 disabled:opacity-50"
        >
          Pro User
        </button>
        {isResetting && <RefreshCw size={12} className="animate-spin text-indigo-600 mr-1" />}
      </div>
    </div>
  );
}
