"use client";

import React, { useState } from "react";
import { Sparkles, Check, AlertCircle, X } from "lucide-react";

interface CouponInputProps {
  onApply: (discountPercent: number, code: string) => void;
  onRemove: () => void;
  appliedCode: string | null;
}

export default function CouponInput({ onApply, onRemove, appliedCode }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    setError(null);
    const cleaned = code.trim().toUpperCase();
    
    if (!cleaned) {
      setError("Please enter a code");
      return;
    }

    // Realistic valid coupon codes
    if (cleaned === "WELCOME20" || cleaned === "SUPPORT20") {
      onApply(20, cleaned);
      setCode("");
    } else if (cleaned === "SUPER50") {
      onApply(50, cleaned);
      setCode("");
    } else {
      setError("Invalid discount code");
    }
  };

  return (
    <div className="font-sans">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        Discount Code
      </label>

      {appliedCode ? (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm text-emerald-800">
          <div className="flex items-center gap-2 font-bold">
            <Check size={16} className="text-emerald-600" />
            <span>Code {appliedCode} Applied</span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-emerald-600 hover:text-emerald-800 p-1 hover:bg-emerald-100/50 rounded-lg transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. WELCOME20"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(null);
              }}
              className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors uppercase placeholder:text-gray-300 font-semibold"
            />
            <button
              type="button"
              onClick={handleApply}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Apply
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-1 text-xs text-red-500 font-semibold mt-1">
              <AlertCircle size={12} />
              <span>{error}</span>
            </div>
          )}
          <p className="text-[10px] text-indigo-500 font-bold flex items-center gap-1 mt-1">
            <Sparkles size={11} className="fill-indigo-100" /> Use WELCOME20 for 20% off your initial purchase.
          </p>
        </div>
      )}
    </div>
  );
}
