"use client";

import React from "react";
import { useBilling } from "@/src/hooks/useBilling";
import CurrentPlanCard from "@/src/components/billing/CurrentPlanCard";
import UsageCard from "@/src/components/billing/UsageCard";
import InvoiceTable from "@/src/components/billing/InvoiceTable";
import UpgradeBanner from "@/src/components/billing/UpgradeBanner";
import BillingSkeleton from "@/src/components/billing/BillingSkeleton";
import EmptyBilling from "@/src/components/billing/EmptyBilling";
import FirstTimeUserView from "@/src/components/billing/FirstTimeUserView";
import { useRouter } from "next/navigation";
import { PLANS } from "@/src/services/mockDb";

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function BillingOverviewPage() {
  const router = useRouter();
  const { overview, isLoading } = useBilling();

  if (isLoading) return <BillingSkeleton />;

  if (!overview) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold text-gray-900">Failed to load billing details</h3>
        <p className="text-sm text-gray-500 mt-1">Please try refreshing the page.</p>
      </div>
    );
  }

  const { subscription, usage, invoices } = overview;

  // CASE 1: First-Time / No subscription
  if (!subscription) return <FirstTimeUserView />;

  const activePlan = PLANS.find((p) => p.id === subscription.planId);

  // CASE 2: Free Plan
  if (subscription.planId === "free") {
    return (
      <div className="space-y-8 font-sans">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md uppercase tracking-wider">
              Current Plan
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">Free Sandbox</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              You are currently on the free tier. Upgrade to Pro to access advanced AI models and remove the SupportPilot branding.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/billing/subscription")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer active:scale-[0.98] shrink-0"
          >
            Upgrade Plan
          </button>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">Sandbox Usage Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UsageCard usage={usage.messages} />
            <UsageCard usage={usage.bots} />
            <UsageCard usage={usage.storage} />
            <UsageCard usage={usage.aiRequests} />
          </div>
        </div>
        <UpgradeBanner />
      </div>
    );
  }

  // CASE 3: Paid Plan (Starter / Pro / Business)
  return (
    <div className="space-y-8 font-sans">
      <CurrentPlanCard subscription={subscription} />

      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-4">Plan Quota Usage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <UsageCard usage={usage.messages} />
          <UsageCard usage={usage.bots} />
          <UsageCard usage={usage.storage} />
          <UsageCard usage={usage.aiRequests} />
        </div>
      </div>

      {subscription.planId === "starter" && <UpgradeBanner />}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-800">Recent Invoices</h3>
          <button
            onClick={() => router.push("/dashboard/billing/invoices")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            View all
          </button>
        </div>
        {invoices.length > 0 ? (
          <InvoiceTable invoices={invoices.slice(0, 3)} />
        ) : (
          <EmptyBilling type="invoices" />
        )}
      </div>
    </div>
  );
}
