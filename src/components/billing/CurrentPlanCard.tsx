"use client";

import React, { useState } from "react";
import { Subscription, Plan } from "@/src/types/Subscription";
import { PLANS } from "@/src/services/mockDb";
import { CreditCard, Calendar, CheckCircle2, AlertTriangle, ArrowUpRight, Ban } from "lucide-react";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import { useRouter } from "next/navigation";

interface CurrentPlanCardProps {
  subscription: Subscription;
}

export default function CurrentPlanCard({ subscription }: CurrentPlanCardProps) {
  const router = useRouter();
  const [cancelOpen, setCancelOpen] = useState(false);

  const plan = PLANS.find((p) => p.id === subscription.planId) as Plan;
  if (!plan) return null;

  const isCancelled = subscription.status === "cancelled" || subscription.cancelAtPeriodEnd;
  const renewalLabel = isCancelled ? "Expires on" : "Renews on";

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm font-sans hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full uppercase tracking-wider">
              Current Plan
            </span>
            {subscription.status === "active" && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <CheckCircle2 size={14} className="fill-emerald-50 text-emerald-600" />
                Active
              </span>
            )}
            {isCancelled && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                <AlertTriangle size={14} />
                Cancels end of period
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">{plan.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
        </div>

        <div className="text-left lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
          <div className="text-4xl font-extrabold text-gray-900">
            ${subscription.price}
            <span className="text-sm font-medium text-gray-400">
              /{subscription.billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Billed {subscription.billingCycle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <Calendar size={15} />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-400">Renewal Cycle</div>
            <div className="font-semibold text-gray-700 capitalize">
              {subscription.billingCycle}ly
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <CreditCard size={15} />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-400">{renewalLabel}</div>
            <div className="font-semibold text-gray-700">
              {new Date(subscription.renewalDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
        <button
          onClick={() => router.push("/dashboard/billing/subscription")}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all shadow-sm shadow-indigo-100 hover:shadow-md cursor-pointer active:scale-[0.98]"
        >
          Change Plan <ArrowUpRight size={14} />
        </button>

        {!isCancelled && (
          <button
            onClick={() => setCancelOpen(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border border-gray-200 hover:border-red-200 font-semibold text-sm px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
          >
            Cancel Subscription <Ban size={14} />
          </button>
        )}
      </div>

      <CancelSubscriptionDialog open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </div>
  );
}
