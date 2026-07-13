"use client";

import React, { useState } from "react";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import PaymentCard from "@/src/components/billing/PaymentCard";
import PaymentModal from "@/src/components/billing/PaymentModal";
import EmptyBilling from "@/src/components/billing/EmptyBilling";
import { CreditCard, Plus, HelpCircle } from "lucide-react";

export default function PaymentMethodsPage() {
  const { paymentMethods, isLoading } = usePaymentMethods();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Add and manage your billing cards used for subscription purchases.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-100 cursor-pointer active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Add Card
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-[180px] bg-gray-50 border border-gray-150 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : paymentMethods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <PaymentCard key={method.id} method={method} />
          ))}
        </div>
      ) : (
        <EmptyBilling type="payment-methods" onActionClick={() => setModalOpen(true)} />
      )}

      {/* Helpful security tip card */}
      <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4.5 flex gap-3 text-xs text-gray-500 leading-relaxed font-semibold">
        <HelpCircle size={16} className="text-gray-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-gray-800 font-bold block mb-1">Updating cards?</span>
          <span>
            If you have an active subscription, updating or adding a new default card will automatically transfer pending subscription renewals to the new card during your next billing invoice period.
          </span>
        </div>
      </div>

      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
