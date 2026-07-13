"use client";

import React from "react";
import { Plan, PlanType, BillingCycle } from "@/src/types/Subscription";
import { Check, Sparkles, MessageSquare, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PlanCardProps {
  plan: Plan;
  currentPlanId: PlanType;
  billingCycle: BillingCycle;
  onSelectPlan: (planId: PlanType) => void;
  isLoading?: boolean;
}

export default function PlanCard({
  plan,
  currentPlanId,
  billingCycle,
  onSelectPlan,
  isLoading,
}: PlanCardProps) {
  const isCurrentPlan = plan.id === currentPlanId;

  // Determine pricing based on cycle
  const price =
    billingCycle === "monthly"
      ? plan.price
      : Math.round(plan.price * 12 * 0.8); // 20% discount

  // Determine button styles and labels
  const getButtonConfig = () => {
    if (isCurrentPlan) {
      return {
        label: "Current Plan",
        className: "bg-gray-100 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-default pointer-events-none",
        action: () => { },
      };
    }

    // Free Starter — no checkout needed
    if (plan.id === "starter" && plan.price === 0) {
      return {
        label: "Get Started Free",
        className: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100",
        action: () => onSelectPlan(plan.id),
      };
    }

    // Compare pricing tier to determine Upgrade vs Downgrade
    const tiers: Record<PlanType, number> = {
      free: 0,
      starter: 1,
      pro: 2,
      business: 3,
      enterprise: 4,
    };

    const isUpgrade = tiers[plan.id] > tiers[currentPlanId];

    return {
      label: isUpgrade ? "Upgrade Plan" : "Downgrade Plan",
      className: plan.isRecommended
        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
      action: () => onSelectPlan(plan.id),
    };
  };

  const btnConfig = getButtonConfig();

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between bg-white rounded-2xl p-6 font-sans border transition-all duration-300",
        plan.isRecommended
          ? "border-2 border-indigo-600 shadow-md md:scale-[1.03] z-10"
          : "border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300"
      )}
    >
      {/* Recommended Tag */}
      {plan.isRecommended && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          <Sparkles size={11} className="fill-white" />
          Recommended
        </span>
      )}

      {/* Plan Details */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
          {isCurrentPlan && (
            <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wide">
              Active Plan
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2 min-h-[40px] leading-relaxed">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="mt-4 flex items-baseline gap-1">

          <>
            <span className="text-4xl font-extrabold text-gray-900">
              ${price}
            </span>
            <span className="text-sm font-semibold text-gray-400">
              /{billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </>

        </div>

        {/* Billing cycle notice — only show for paid plans */}
        {billingCycle === "yearly" && plan.price > 0 && (
          <p className="text-[10px] text-indigo-600 font-bold mt-1">
            Billed annually (Save 20%)
          </p>
        )}
        {plan.price === 0 && (
          <p className="text-[10px] text-emerald-600 font-bold mt-1">
            Always free — no credit card required
          </p>
        )}

        {/* Resource Limits Summary */}
        <div className="mt-5 p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-2 text-xs font-semibold text-gray-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1"><MessageSquare size={13} className="text-gray-400" />Messages:</span>
            <span className="text-gray-900">{plan.limits.messages === 999999 ? "Unlimited" : plan.limits.messages.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1"><Cpu size={13} className="text-gray-400" />Bots Allowed:</span>
            <span className="text-gray-900">{plan.limits.bots === 999 ? "Unlimited" : plan.limits.bots}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* Features List */}
        <ul className="space-y-3 text-sm text-gray-600 mb-6">
          {plan.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <button
        onClick={btnConfig.action}
        disabled={isLoading || isCurrentPlan}
        className={cn(
          "w-full py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer text-center flex items-center justify-center active:scale-[0.98]",
          btnConfig.className
        )}
      >
        {btnConfig.label}
      </button>
    </div>
  );
}
