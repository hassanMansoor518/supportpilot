"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PLANS } from "@/src/services/mockDb";
import { PlanType, BillingCycle, Plan } from "@/src/types/Subscription";
import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planId = (searchParams.get("plan") || "pro") as PlanType;
  const cycle = (searchParams.get("cycle") || "monthly") as BillingCycle;
  const total = searchParams.get("total") || "53.90";

  const plan = PLANS.find((p) => p.id === planId) as Plan;

  return (
    <div className="bg-white border border-gray-200/80 rounded-3xl p-8 md:p-12 text-center shadow-md font-sans max-w-xl mx-auto my-6">
      {/* Animated Success Checkmark Ring */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute inset-0 bg-emerald-50 rounded-full border border-emerald-100"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow shadow-emerald-250 z-10"
        >
          <Check size={28} strokeWidth={3} />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 leading-snug">
        Subscription Activated!
      </h2>
      <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
        Thank you for your purchase. Your dashboard has been upgraded and premium features are now unlocked.
      </p>

      {/* Plan Details Card */}
      {plan && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left space-y-3.5">
          <div className="flex justify-between items-center pb-2.5 border-b border-gray-150">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plan Activated</span>
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">
              {plan.name}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-500">Transaction Price</span>
            <span className="text-gray-900">${total} (includes VAT)</span>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-500">Renewal Cycle</span>
            <span className="text-gray-900 capitalize">{cycle}ly</span>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-gray-500">Next Renewal Date</span>
            <span className="text-gray-900">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
        <button
          onClick={() => router.push("/dashboard/billing/invoices")}
          className="w-full sm:flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
        >
          <FileText size={16} />
          View Invoices
        </button>
        <button
          onClick={() => router.push("/dashboard/billing/overview")}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 hover:shadow active:scale-95"
        >
          Go to Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-gray-500">Processing confirmation...</span>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
