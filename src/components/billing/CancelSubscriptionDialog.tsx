"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscription } from "@/src/hooks/useSubscription";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface CancelSubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CancelSubscriptionDialog({ open, onClose }: CancelSubscriptionDialogProps) {
  const { cancel, isCancelling } = useSubscription();

  const handleCancel = async () => {
    try {
      await cancel();
      toast.success("Subscription cancelled successfully.");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel subscription.");
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

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900">Cancel Subscription?</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  We are sorry to see you go! If you cancel, your current Pro plan features will remain active until the end of the current billing cycle. You will not be charged again.
                </p>
                <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3 mt-4 text-xs text-amber-800 flex items-start gap-2">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>
                    Cancelling means you will lose access to premium templates, advanced AI models, and priority support.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={onClose}
                  disabled={isCancelling}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  No, keep it
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isCancelling ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Yes, cancel"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
