"use client";

import React, { useState } from "react";
import { MonthlyUsageItem, DailyRequestItem, BotUsageItem } from "@/src/types/Usage";
import { motion } from "framer-motion";
import { BarChart, Activity, TrendingUp, Users, Cpu } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface UsageChartProps {
  monthlyUsage: MonthlyUsageItem[];
  dailyRequests: DailyRequestItem[];
  topBots: BotUsageItem[];
}

export default function UsageChart({ monthlyUsage, dailyRequests, topBots }: UsageChartProps) {
  const [activeTab, setActiveTab] = useState<"monthly" | "daily" | "bots">("monthly");

  // Calculations for Monthly Usage Chart
  const maxMessages = Math.max(...monthlyUsage.map((d) => d.messages), 1);
  const maxAiRequests = Math.max(...monthlyUsage.map((d) => d.aiRequests), 1);

  // Calculations for Daily Requests Chart
  const maxRequests = Math.max(...dailyRequests.map((d) => d.requests), 1);

  // Calculations for Top Bots
  const maxBotMessages = Math.max(...topBots.map((d) => d.messages), 1);

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden font-sans">
      {/* Chart Headers & Selectors */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart size={18} className="text-indigo-650" />
            Usage Analytics
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Visualize API calls, queries, and bot activity.</p>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200/60 self-start text-xs font-semibold text-gray-600">
          <button
            onClick={() => setActiveTab("monthly")}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
              activeTab === "monthly" ? "bg-white text-indigo-750 shadow-sm" : "hover:text-gray-900"
            )}
          >
            Monthly Usage
          </button>
          <button
            onClick={() => setActiveTab("daily")}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
              activeTab === "daily" ? "bg-white text-indigo-750 shadow-sm" : "hover:text-gray-900"
            )}
          >
            Daily Queries
          </button>
          <button
            onClick={() => setActiveTab("bots")}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
              activeTab === "bots" ? "bg-white text-indigo-750 shadow-sm" : "hover:text-gray-900"
            )}
          >
            Top Bots
          </button>
        </div>
      </div>

      {/* Chart Visualizer Panel */}
      <div className="p-6">
        {/* MONTHLY USAGE CHART */}
        {activeTab === "monthly" && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 text-xs font-semibold mb-4 text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                Messages Sent
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-300" />
                AI API Requests
              </div>
            </div>

            {monthlyUsage.length > 0 ? (
              <div className="h-[250px] flex items-end justify-between gap-4 pt-6 border-b border-gray-100 px-2">
                {monthlyUsage.map((item, idx) => {
                  const msgPct = (item.messages / maxMessages) * 100;
                  const reqPct = (item.aiRequests / maxAiRequests) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1.5 h-full">
                        {/* Messages Bar */}
                        <div className="relative w-4 md:w-6 h-full flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${msgPct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                            className="w-full bg-indigo-600 rounded-t hover:bg-indigo-750 transition-colors cursor-pointer"
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                            Messages: {item.messages.toLocaleString()}
                          </div>
                        </div>

                        {/* Requests Bar */}
                        <div className="relative w-4 md:w-6 h-full flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${reqPct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.05 + 0.1 }}
                            className="w-full bg-indigo-300 rounded-t hover:bg-indigo-400 transition-colors cursor-pointer"
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                            AI Requests: {item.aiRequests.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-400 mt-2 select-none">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
                No monthly data available.
              </div>
            )}
          </div>
        )}

        {/* DAILY REQUESTS CHART (Area/Sparkline visualizer) */}
        {activeTab === "daily" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-500" />
                Requests over the last 7 days
              </span>
              <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Peak: {maxRequests.toLocaleString()} queries
              </span>
            </div>

            {dailyRequests.length > 0 ? (
              <div className="h-[250px] flex items-end justify-between gap-3 pt-6 border-b border-gray-100 px-2">
                {dailyRequests.map((item, idx) => {
                  const heightPct = (item.requests / maxRequests) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="relative w-full h-full flex items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPct}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.04 }}
                          className="w-8/12 bg-gradient-to-t from-indigo-500/20 to-indigo-600 rounded-t-lg group-hover:brightness-95 transition-all cursor-pointer"
                        />
                        {/* Sparkline Node Tooltip */}
                        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                          {item.requests} queries
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 mt-2 whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
                No daily requests recorded.
              </div>
            )}
          </div>
        )}

        {/* TOP BOTS CHART (Horizontal Comparison Bar chart) */}
        {activeTab === "bots" && (
          <div className="space-y-5">
            <div className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-1.5">
              <Cpu size={14} className="text-indigo-600" />
              Bot efficiency by message throughput
            </div>

            {topBots.length > 0 ? (
              <div className="space-y-4">
                {topBots.map((bot, idx) => {
                  const widthPct = (bot.messages / maxBotMessages) * 100;

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-gray-800">{bot.botName}</span>
                        <span className="text-gray-900 font-bold">
                          {bot.messages.toLocaleString()} messages
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-650 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
                No active chatbots running.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
