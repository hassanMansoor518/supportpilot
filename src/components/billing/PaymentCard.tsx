"use client";

import React, { useState } from "react";
import { PaymentMethod } from "@/src/types/PaymentMethod";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { CreditCard, Trash2, ShieldCheck, Check, MoreVertical, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface PaymentCardProps {
  method: PaymentMethod;
}

export default function PaymentCard({ method }: PaymentCardProps) {
  const { deletePaymentMethod, isDeleting, setDefaultPaymentMethod, isSettingDefault } = usePaymentMethods();
  const [localDeleting, setLocalDeleting] = useState(false);
  const [localSetting, setLocalSetting] = useState(false);

  const getBrandLogo = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return (
          <div className="font-extrabold text-blue-800 italic text-lg tracking-wider select-none">
            VISA
          </div>
        );
      case "mastercard":
        return (
          <div className="flex items-center select-none">
            <div className="w-5 h-5 rounded-full bg-red-500 z-10 -mr-2" />
            <div className="w-5 h-5 rounded-full bg-amber-500" />
          </div>
        );
      case "amex":
        return (
          <div className="font-bold text-cyan-700 text-sm tracking-tighter bg-cyan-50 border border-cyan-200 px-1 rounded select-none">
            AMEX
          </div>
        );
      case "discover":
        return (
          <div className="font-black text-orange-600 italic text-sm tracking-wide select-none">
            DISCOVER
          </div>
        );
      default:
        return <CreditCard className="text-gray-400" size={20} />;
    }
  };

  const handleSetDefault = async () => {
    if (method.isDefault || localSetting) return;
    setLocalSetting(true);
    try {
      await setDefaultPaymentMethod(method.id);
      toast.success("Default payment method updated.");
    } catch (err) {
      toast.error("Failed to update default card.");
    } finally {
      setLocalSetting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      setLocalDeleting(true);
      try {
        await deletePaymentMethod(method.id);
        toast.success("Payment method deleted successfully.");
      } catch (err) {
        toast.error("Failed to delete card.");
      } finally {
        setLocalDeleting(false);
      }
    }
  };

  return (
    <div className="relative bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow font-sans flex flex-col justify-between h-[180px]">
      <div className="flex items-start justify-between">
        <div className="w-12 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
          {getBrandLogo(method.brand)}
        </div>

        {method.isDefault ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full">
            <ShieldCheck size={12} />
            Default
          </span>
        ) : (
          <button
            onClick={handleSetDefault}
            disabled={localSetting || isSettingDefault}
            className="text-[11px] font-semibold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 px-2 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            {localSetting ? (
              <Loader2 size={10} className="animate-spin" />
            ) : (
              <Check size={10} />
            )}
            Set Default
          </button>
        )}
      </div>

      <div className="mt-4">
        <div className="text-lg font-bold text-gray-800 tracking-wider">
          •••• •••• •••• {method.last4}
        </div>
        <div className="text-xs font-semibold text-gray-400 mt-0.5">
          Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear.toString().slice(-2)}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
        <span className="text-xs font-semibold text-gray-600 truncate max-w-[150px]">
          {method.cardholderName}
        </span>

        <button
          onClick={handleDelete}
          disabled={localDeleting || isDeleting}
          className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50/50 transition-colors disabled:opacity-50 cursor-pointer"
          title="Delete Payment Card"
        >
          {localDeleting ? (
            <Loader2 size={14} className="animate-spin text-red-600" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </div>
    </div>
  );
}
