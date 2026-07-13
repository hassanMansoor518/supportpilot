"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, HelpCircle, Info, CheckCircle2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "danger" | "warning" | "info" | "success";
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type = "info",
  isLoading = false,
}: ConfirmationDialogProps) {
  const configs = {
    danger: {
      icon: AlertCircle,
      iconClass: "text-red-600 bg-red-50",
      btnClass: "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-100",
    },
    warning: {
      icon: AlertCircle,
      iconClass: "text-amber-600 bg-amber-50",
      btnClass: "bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-100",
    },
    info: {
      icon: Info,
      iconClass: "text-indigo-650 bg-indigo-50",
      btnClass: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100",
    },
    success: {
      icon: CheckCircle2,
      iconClass: "text-emerald-600 bg-emerald-50",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-100",
    },
  };

  const current = configs[type];
  const Icon = current.icon;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
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
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.18 }}
            className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", current.iconClass)}>
                  <Icon size={20} />
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-sm py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 font-semibold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50",
                    current.btnClass
                  )}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    confirmLabel
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
