"use client";

import React from "react";
import { Plan, BillingCycle } from "@/src/types/Subscription";
import { ShieldCheck, Tag, Info } from "lucide-react";

interface OrderSummaryProps {
  plan: Plan;
  billingCycle: BillingCycle;
  discountPercent: number;
  appliedCode: string | null;
}

export default function OrderSummary({
  plan,
  billingCycle,
  discountPercent,
  appliedCode,
}: OrderSummaryProps) {
  // Base price (applying 20% discount on base plan if yearly)
  const basePrice =
    billingCycle === "monthly" ? plan.price : Math.round(plan.price * 12 * 0.8);

  const discountAmount = Math.round(basePrice * (discountPercent / 100) * 100) / 100;
  const subtotal = basePrice - discountAmount;
  const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 md:p-6 font-sans">
      <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-3">
        Order Summary
      </h3>

      {/* Plan Row */}
      <div className="flex justify-between items-start mt-4">
        <div>
          <div className="font-bold text-gray-900">{plan.name} Plan</div>
          <div className="text-xs text-gray-500 mt-0.5 capitalize">
            Billing Cycle: {billingCycle}ly
          </div>
        </div>
        <div className="font-bold text-gray-900">${basePrice.toFixed(2)}</div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-dashed border-gray-200 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-500 font-semibold">
          <span>Subtotal</span>
          <span className="text-gray-700">${basePrice.toFixed(2)}</span>
        </div>

        {/* Discount */}
        {discountPercent > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span className="flex items-center gap-1">
              <Tag size={14} />
              Discount ({discountPercent}%{appliedCode ? ` - ${appliedCode}` : ""})
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-gray-500 font-semibold">
          <span className="flex items-center gap-1">
            VAT (10%)
            <span className="cursor-help" title="Standard 10% Value Added Tax">
              <Info size={12} className="text-gray-400" />
            </span>
          </span>
          <span className="text-gray-700">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline mt-5 pt-4 border-t border-gray-200">
        <span className="text-base font-bold text-gray-900">Total Due</span>
        <div className="text-right">
          <span className="text-2xl font-black text-indigo-900">
            ${total.toFixed(2)}
          </span>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
            Next renewal: {billingCycle === "monthly" ? "in 30 days" : "in 1 year"}
          </p>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-5 p-3 rounded-xl bg-white border border-gray-150 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-indigo-650 shrink-0 mt-0.5" />
        <div className="text-[10px] text-gray-500 leading-relaxed font-semibold">
          By clicking secure checkout, you authorize SupportPilot to charge this payment method in accordance with our terms of service.
        </div>
      </div>
    </div>
  );
}
