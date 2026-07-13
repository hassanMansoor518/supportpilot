"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plan, PlanType, BillingCycle } from "@/src/types/Subscription";
import { PLANS } from "@/src/services/mockDb";
import { useSubscription } from "@/src/hooks/useSubscription";
import { X, Sparkles, CheckCircle2, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UpgradeDialogProps {
  open: boolean;
  onClose: () => void;
  planId: PlanType | null;
  billingCycle: BillingCycle;
}

export default function UpgradeDialog({ open, onClose, planId, billingCycle }: UpgradeDialogProps) {
  const router = useRouter();
  const { upgrade, isUpgrading } = useSubscription();

  const plan = PLANS.find((p) => p.id === planId) as Plan;
  if (!plan) return null;

  const price = billingCycle === "monthly" ? plan.price : Math.round(plan.price * 12 * 0.8);

  const handleConfirm = async () => {
    try {
      // Proceed to the checkout page directly, carrying selection in URL queries
      onClose();
      router.push(`/dashboard/billing/checkout?plan=${plan.id}&cycle=${billingCycle}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to proceed to checkout.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Sparkles size={18} className="fill-indigo-50" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Change Plan</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Selected Tier
                  </div>
                  <div className="text-2xl font-extrabold text-indigo-900 mt-1">
                    {plan.name}
                  </div>
                  <div className="text-3xl font-black text-gray-900 mt-2">
                    ${price}
                    <span className="text-xs font-semibold text-gray-400 ml-1">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      Billed Annually (20% discount applied)
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 text-xs text-gray-600 font-semibold">
                  <div className="flex justify-between items-center">
                    <span>Messages Limit:</span>
                    <span className="text-gray-900">
                      {plan.limits.messages === 999999 ? "Unlimited" : plan.limits.messages.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bots Limit:</span>
                    <span className="text-gray-900">{plan.limits.bots === 999 ? "Unlimited" : plan.limits.bots}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI Engine Models:</span>
                    <span className="text-gray-900">
                      {plan.id === "free" ? "Basic" : plan.id === "starter" ? "Standard" : "Advanced AI Models"}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 text-xs text-indigo-800 flex items-start gap-2.5 leading-relaxed font-semibold">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-indigo-650" />
                  <span>
                    You will be redirected to our secure checkout page to review order taxes, apply promo codes, and complete payment.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
