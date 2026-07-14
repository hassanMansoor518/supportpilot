"use client";

import React from "react";
import {
  Bot,
  ChevronDown,
  ChevronUp,
  Home,
  Puzzle,
  Calendar,
  Settings,
  Crown,
  ArrowRight,
  CircleHelp,
  LayoutDashboard,
  CreditCard,
  FileText,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLeftSide() {
  const pathname = usePathname();
  const [isBillingOpen, setIsBillingOpen] = React.useState(pathname.includes("/dashboard/billing"));

  const isLinkActive = (path: string) => {
    return pathname === path;
  };

  const isBillingActive = pathname.includes("/dashboard/billing");

  // Keep billing expanded if user navigates to a billing page
  React.useEffect(() => {
    if (pathname.includes("/dashboard/billing")) {
      setIsBillingOpen(true);
    }
  }, [pathname]);


  return (
    <div className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col font-sans">
      {/* Header / Logo */}
      <div className="px-5 py-5 flex items-center gap-2 border-b border-gray-100">
        <div className="text-indigo-600">
          <Bot size={25} strokeWidth={2.5} />
        </div>
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">SupportPilot</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-5 overflow-y-auto">
        <div className="mb-4">
          <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 pt-8 pb-5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Home size={18} className="text-gray-500" />
            <span className="text-sm font-medium">Overview</span>
          </Link>
        </div>

        <div className="mb-2 mt-4 px-3 text-[11px] font-semibold text-gray-500 tracking-wider">
          MANAGE
        </div>

        <div className="space-y-2">
          {/* AI Chatbot (Expanded) */}
          <div className="flex flex-col">
            <button className="w-full flex items-center justify-between px-3 py-2 text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Bot size={18} />
                <span className="text-sm font-semibold">AI Chatbot</span>
              </div>
              <ChevronUp size={16} />
            </button>

            {/* Sub-items */}
            <div className="ml-6 mt-1 flex flex-col relative before:absolute before:left-2.5 before:top-0 before:bottom-2 before:w-[1px] before:bg-gray-200">
              <Link
                href="/dashboard/ChatbotSettings"
                className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${isLinkActive("/dashboard/ChatbotSettings")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Chatbot Settings
              </Link>
              <Link
                href="/dashboard/chatbots"
                className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${isLinkActive("/dashboard/chatbots")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Chatbots
              </Link>
          
              <Link
                href="/dashboard/TestPlayground"
                className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg flex items-center justify-between transition-colors ${isLinkActive("/dashboard/TestPlayground")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <span>Test Playground</span>

                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600 font-semibold">
                  NEW
                </span>
              </Link>
              <Link
                href="/dashboard/Integrations"
                className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg transition-colors ${isLinkActive("/dashboard/Integrations")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Integrate Your Bot
              </Link>
            </div>
          </div>



          {/* Billing Collapsible */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsBillingOpen(!isBillingOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                isBillingActive
                  ? "text-indigo-600 bg-indigo-50/30 font-semibold"
                  : "text-gray-650 hover:text-gray-900 hover:bg-gray-50/85"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} className={isBillingActive ? "text-indigo-650" : "text-gray-455"} />
                <span className="text-sm font-semibold">Billing</span>
              </div>
              {isBillingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isBillingOpen && (
              <div className="ml-6 mt-1 flex flex-col relative before:absolute before:left-2.5 before:top-0 before:bottom-2 before:w-[1px] before:bg-gray-200">
                <Link
                  href="/dashboard/billing/overview"
                  className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${
                    isLinkActive("/dashboard/billing/overview") || isLinkActive("/dashboard/billing")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Overview
                </Link>
                <Link
                  href="/dashboard/billing/subscription"
                  className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${
                    isLinkActive("/dashboard/billing/subscription")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Subscription
                </Link>
                <Link
                  href="/dashboard/billing/payment-methods"
                  className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${
                    isLinkActive("/dashboard/billing/payment-methods")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Payment Methods
                </Link>
                <Link
                  href="/dashboard/billing/invoices"
                  className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg mb-1 relative z-10 block transition-colors ${
                    isLinkActive("/dashboard/billing/invoices")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Invoices
                </Link>
                <Link
                  href="/dashboard/billing/usage"
                  className={`w-full text-left pl-7 py-2 text-sm font-medium rounded-lg relative z-10 block transition-colors ${
                    isLinkActive("/dashboard/billing/usage")
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Usage
                </Link>
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Settings</span>
            </div>

          </button>
          <Link
            href="/dashboard/help"
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <CircleHelp size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Help Center</span>
          </Link>
        </div>
      </div>

      {/* Plan Card */}
      <div className="p-5">
        <div className="bg-[#f5f3ff] rounded-2xl p-4">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-[13px] mb-3">
            <Crown size={16} />
            <span>Pro Plan</span>
          </div>

          <div className="text-[13px] font-medium text-gray-900 mb-3">
            You're on Pro Plan
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: "38.2%" }}></div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 mb-4 font-medium">
            <span className="text-gray-900 font-semibold">3,820 / 10,000</span> messages
          </div>

          <button className="w-full flex items-center justify-center gap-1.5 bg-indigo-600/5 hover:bg-indigo-600/10 text-indigo-700 font-semibold text-sm py-2 rounded-lg transition-colors">
            Upgrade Plan <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
