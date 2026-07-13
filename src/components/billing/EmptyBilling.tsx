"use client";

import React from "react";
import {
  FileText,
  CreditCard,
  BarChart3,
  HelpCircle,
  Plus,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Download,
  Sparkles,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyBillingProps {
  type: "invoices" | "payment-methods" | "usage";
  onActionClick?: () => void;
  actionLabel?: string;
}

// ---------------------------------------------------------------------------
// Dedicated premium "No Invoices" empty state
// ---------------------------------------------------------------------------
function EmptyInvoices() {
  const router = useRouter();

  const steps = [
    {
      icon: ShieldCheck,
      label: "Activate a Plan",
      desc: "Subscribe to any paid plan to unlock billing.",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      icon: CreditCard,
      label: "First Payment Processed",
      desc: "A receipt is generated instantly on checkout.",
      color: "bg-violet-50 text-violet-600 border-violet-100",
    },
    {
      icon: Receipt,
      label: "Invoice Issued Here",
      desc: "All invoices appear here ready to download as PDF.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  return (
    <div className="font-sans w-full">
      {/* Main illustration card */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white border border-gray-200/80 rounded-2xl p-8 md:p-10 flex flex-col items-center text-center shadow-sm">
        {/* Soft blurred background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Stacked invoice illustration */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          {/* Back paper */}
          <div className="absolute top-1 left-5 w-16 h-20 bg-gray-100 border border-gray-200 rounded-lg rotate-[-8deg] shadow-sm" />
          {/* Middle paper */}
          <div className="absolute top-0 left-3 w-16 h-20 bg-white border border-gray-200 rounded-lg rotate-[-3deg] shadow-sm">
            <div className="p-2 space-y-1.5 mt-1">
              <div className="h-1.5 bg-gray-200 rounded-full w-10" />
              <div className="h-1.5 bg-gray-100 rounded-full w-8" />
              <div className="h-1.5 bg-gray-100 rounded-full w-12" />
            </div>
          </div>
          {/* Front paper */}
          <div className="absolute top-0 left-1 w-16 h-20 bg-white border border-indigo-200/70 rounded-lg shadow-md z-10">
            <div className="bg-indigo-600 rounded-t-lg px-2 py-1.5 flex items-center gap-1">
              <FileText size={10} className="text-white" />
              <span className="text-[8px] font-bold text-white tracking-wide">INVOICE</span>
            </div>
            <div className="p-2 space-y-1.5 mt-1">
              <div className="h-1.5 bg-indigo-100 rounded-full w-10" />
              <div className="h-1.5 bg-gray-100 rounded-full w-8" />
              <div className="h-1.5 bg-gray-100 rounded-full w-12" />
              <div className="mt-2 h-3 bg-indigo-50 border border-indigo-100 rounded w-full" />
            </div>
          </div>
          {/* Download icon badge */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-md z-20 border-2 border-white">
            <Download size={13} className="text-white" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mt-2">
          No Invoices Yet
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xs font-medium">
          Your billing receipts and payment confirmations will appear here once you activate a subscription plan.
        </p>

        <button
          onClick={() => router.push("/dashboard/billing/subscription")}
          className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
        >
          <Sparkles size={15} className="fill-indigo-200" />
          Browse Plans
          <ArrowRight size={15} />
        </button>

        <p className="text-[10px] text-gray-400 font-semibold mt-3 flex items-center gap-1">
          <Clock size={11} />
          Invoices are generated within seconds of each payment
        </p>
      </div>

      {/* How invoices work — 3-step timeline */}
      <div className="mt-6 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-5">
          How invoices are generated
        </p>
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <div key={i} className="flex sm:flex-col items-start sm:items-center flex-1 relative gap-4 sm:gap-0 pb-6 sm:pb-0">
                {/* Connector line */}
                {!isLast && (
                  <>
                    {/* vertical for mobile */}
                    <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-gray-100 sm:hidden" />
                    {/* horizontal for desktop */}
                    <div className="hidden sm:block absolute top-5 left-1/2 right-0 h-[1px] bg-gray-100" />
                  </>
                )}

                {/* Icon circle */}
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${step.color}`}>
                  <Icon size={18} />
                </div>

                {/* Text */}
                <div className="sm:text-center sm:mt-3 sm:px-2">
                  <div className="text-xs font-extrabold text-gray-800">{step.label}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed font-medium">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic empty state for other types
// ---------------------------------------------------------------------------
export default function EmptyBilling({ type, onActionClick, actionLabel }: EmptyBillingProps) {
  if (type === "invoices") return <EmptyInvoices />;

  const configs = {
    "payment-methods": {
      icon: CreditCard,
      title: "No Payment Methods",
      description:
        "You haven't added any payment methods yet. Add a payment card to purchase premium subscriptions.",
      actionLabel: "Add Payment Method",
    },
    usage: {
      icon: BarChart3,
      title: "No Usage Data",
      description:
        "No bot interactions or message logs recorded in this period. Start conversing with your bots to track usage.",
      actionLabel: "Go to Chatbot Settings",
    },
  } as const;

  const config = (configs as any)[type] ?? {
    icon: HelpCircle,
    title: "No Data Available",
    description: "There is no information to display here at the moment.",
    actionLabel: "Go Back",
  };

  const Icon = config.icon;

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-8 md:p-12 text-center shadow-sm font-sans flex flex-col items-center justify-center max-w-lg mx-auto my-6">
      <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-5 shadow-inner">
        <Icon size={28} className="text-indigo-500/80" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 leading-snug">{config.title}</h3>

      <p className="text-sm text-gray-500 mt-2.5 leading-relaxed max-w-sm">{config.description}</p>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="mt-6 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
        >
          {type === "payment-methods" && <Plus size={15} />}
          {actionLabel || config.actionLabel}
        </button>
      )}
    </div>
  );
}
