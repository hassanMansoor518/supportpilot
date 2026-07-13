"use client";

import React from "react";
import { useUsage } from "@/src/hooks/useUsage";
import UsageCard from "@/src/components/billing/UsageCard";
import UsageChart from "@/src/components/billing/UsageChart";
import { SkeletonCard, SkeletonChart } from "@/src/components/billing/BillingSkeleton";
import { BarChart3, AlertCircle } from "lucide-react";

export default function UsageAnalyticsPage() {
  const { usage, isLoading } = useUsage();

  if (isLoading) {
    return (
      <div className="space-y-8 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonChart />
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="text-center py-12 font-sans">
        <h3 className="text-lg font-bold text-gray-900">Failed to fetch usage metrics</h3>
        <p className="text-sm text-gray-500 mt-1">Please refresh or check back later.</p>
      </div>
    );
  }

  // Count how many limits are near or at warning threshold (80%)
  const highUsageCount = Object.values(usage).filter(
    (item) => typeof item === "object" && "used" in item && "limit" in item && item.limit > 0 && (item.used / item.limit) >= 0.8
  ).length;

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 size={20} className="text-indigo-650" />
          Usage & Resource Quotas
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Monitor your active chatbot queries, dataset sizes, and standard API logs.
        </p>
      </div>

      {/* Threshold Alert banner */}
      {highUsageCount > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4.5 text-xs text-amber-800 flex items-start gap-3 leading-relaxed font-semibold">
          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-amber-900 font-bold block mb-1">Quota limit warnings detected!</span>
            <span>
              You have {highUsageCount} resources that have exceeded 80% of their monthly limit allocation. Consider upgrading your plan tier or purchasing additional message packs to prevent bot service interruptions.
            </span>
          </div>
        </div>
      )}

      {/* Quotas grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UsageCard usage={usage.messages} />
        <UsageCard usage={usage.bots} />
        <UsageCard usage={usage.storage} />
        <UsageCard usage={usage.aiRequests} />
      </div>

      {/* Analytics Chart panels */}
      <UsageChart
        monthlyUsage={usage.monthlyUsage}
        dailyRequests={usage.dailyRequests}
        topBots={usage.topBots}
      />
    </div>
  );
}
