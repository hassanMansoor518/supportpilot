"use client";

import React from "react";
import { InvoiceStatus } from "@/src/types/Invoice";
import { CheckCircle2, HelpCircle, AlertCircle, Ban, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export default function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = {
    paid: {
      label: "Paid",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    open: {
      label: "Open",
      icon: HelpCircle,
      className: "bg-blue-50 text-blue-700 border-blue-100",
    },
    failed: {
      label: "Failed",
      icon: AlertCircle,
      className: "bg-red-50 text-red-700 border-red-100",
    },
    void: {
      label: "Void",
      icon: Ban,
      className: "bg-gray-50 text-gray-500 border-gray-150",
    },
    uncollectible: {
      label: "Uncollectible",
      icon: AlertCircle,
      className: "bg-amber-50 text-amber-700 border-amber-100",
    },
  };

  const badge = config[status] || {
    label: status,
    icon: HelpCircle,
    className: "bg-gray-50 text-gray-700 border-gray-150",
  };

  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
        badge.className
      )}
    >
      <Icon size={12} className="shrink-0" />
      <span>{badge.label}</span>
    </span>
  );
}
