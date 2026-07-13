"use client";

import React from "react";
import { ResourceUsage } from "@/src/types/Usage";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface UsageCardProps {
  usage: ResourceUsage;
}

export default function UsageCard({ usage }: UsageCardProps) {
  const { used, limit, label, unit = "" } = usage;
  
  // Calculate percentage, capping at 100%
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isHighUsage = percentage >= 80;
  const isMaxedOut = percentage >= 100;

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow font-sans">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
        {isHighUsage ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
            <AlertCircle size={12} />
            {isMaxedOut ? "Limit reached" : "Near limit"}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <CheckCircle2 size={12} />
            Healthy
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-gray-900">
          {used.toLocaleString()}
          {unit && <span className="text-sm font-medium text-gray-500 ml-0.5">{unit}</span>}
        </span>
        <span className="text-xs font-semibold text-gray-400">
          / {limit > 0 ? `${limit.toLocaleString()}${unit}` : "unlimited"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isMaxedOut
                ? "bg-red-500"
                : isHighUsage
                ? "bg-amber-500"
                : "bg-indigo-600"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400 font-semibold">
        <span>{percentage.toFixed(0)}% used</span>
        {limit > 0 && <span>{(limit - used) > 0 ? `${(limit - used).toLocaleString()}${unit} left` : `0${unit} left`}</span>}
      </div>
    </div>
  );
}
