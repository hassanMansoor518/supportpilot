"use client";

import React, { useState } from "react";
import { useSubscription } from "@/src/hooks/useSubscription";
import { AlertCircle, RotateCcw, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutCancelPage() {
  const router = useRouter();
  const { reactivate, isReactivating } = useSubscription();
  const [localReactivating, setLocalReactivating] = useState(false);

  const handleReactivate = async () => {
    setLocalReactivating(true);
    try {
      await reactivate();
      toast.success("Subscription reactivated successfully!");
      router.push("/dashboard/billing/overview");
    } catch (err: any) {
      toast.error(err.message || "Failed to reactivate subscription.");
    } finally {
      setLocalReactivating(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-3xl p-8 md:p-12 text-center shadow-md font-sans max-w-xl mx-auto my-6">
      {/* Visual Indicator */}
      <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mx-auto mb-6 shadow-inner animate-pulse">
        <AlertCircle size={28} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 leading-snug">
        Subscription Checkout Cancelled
      </h2>
      <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
        Your payment transaction was cancelled. No charges were made to your account.
      </p>

      <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4.5 text-xs text-amber-800 text-left mt-8 space-y-1 font-semibold">
        <span className="text-amber-900 font-bold block mb-1">Changed your mind?</span>
        <span>
          If you already have a plan on file and want to reactivate auto-renewal, click the reactivation link below. Otherwise, you can go back to pricing plans.
        </span>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center">
        <button
          onClick={() => router.push("/dashboard/billing/subscription")}
          className="w-full sm:flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
        >
          <ArrowLeft size={16} />
          View Plans
        </button>

        <button
          onClick={handleReactivate}
          disabled={localReactivating || isReactivating}
          className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 hover:shadow active:scale-95 disabled:opacity-50"
        >
          {localReactivating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RotateCcw size={16} />
          )}
          Reactivate Subscription
        </button>
      </div>

      {/* Support footer info */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 font-semibold flex items-center justify-center gap-1">
        Questions about billing? Contact
        <a
          href="mailto:support@supportpilot.com"
          className="text-indigo-600 hover:underline flex items-center gap-0.5"
        >
          <Mail size={12} className="inline" />
          support@supportpilot.com
        </a>
      </div>
    </div>
  );
}
