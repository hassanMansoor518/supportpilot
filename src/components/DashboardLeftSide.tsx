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
} from "lucide-react";

export default function DashboardLeftSide() {
  return (
    <div className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col font-sans">
      {/* Header / Logo */}
      <div className="px-5 py-6 flex items-center gap-2">
        <div className="text-indigo-600">
          <Bot size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-[19px] font-bold text-gray-900 tracking-tight">SupportPilot</h1>
      </div>

      {/* Workspace Selector */}
      <div className="px-5 mb-6">
        <button className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-1.5 pr-3 hover:bg-gray-50 transition-colors shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              GE
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">Gada Electronics</span>
              <span className="text-xs text-gray-500">Workspace</span>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 overflow-y-auto">
        <div className="mb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Home size={18} className="text-gray-500" />
            <span className="text-sm font-medium">Overview</span>
          </button>
        </div>

        <div className="mb-2 mt-4 px-3 text-[11px] font-semibold text-gray-500 tracking-wider">
          MANAGE
        </div>

        <div className="space-y-1">
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
              <button className="w-full text-left pl-7 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg mb-1 relative z-10">
                Chatbot Settings
              </button>
              <button className="w-full text-left pl-7 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Training Data
              </button>
              <button className="w-full text-left pl-7 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Test Your Bot
              </button>
            </div>
          </div>

          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors mt-1">
            <Puzzle size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Integrations</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Calendar size={18} className="text-gray-400" />
            <span className="text-sm font-medium">Billing</span>
          </button>

          <button className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
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
