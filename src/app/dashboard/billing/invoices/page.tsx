"use client";

import React from "react";
import { useInvoices } from "@/src/hooks/useInvoices";
import InvoiceTable from "@/src/components/billing/InvoiceTable";
import EmptyBilling from "@/src/components/billing/EmptyBilling";
import { SkeletonTable } from "@/src/components/billing/BillingSkeleton";
import { FileText, Download } from "lucide-react";

export default function InvoicesHistoryPage() {
  const { invoices, isLoading } = useInvoices();

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-gray-900">Billing Invoices</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Review, search, and download your subscription transaction history.
        </p>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : invoices.length > 0 ? (
        <InvoiceTable invoices={invoices} />
      ) : (
        <EmptyBilling type="invoices" />
      )}
    </div>
  );
}
