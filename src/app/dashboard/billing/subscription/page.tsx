"use client";

import React, { useState } from "react";
import { useSubscription } from "@/src/hooks/useSubscription";
import PlanCard from "@/src/components/billing/PlanCard";
import PricingComparison from "@/src/components/billing/PricingComparison";
import UpgradeDialog from "@/src/components/billing/UpgradeDialog";
import { BillingCycle, PlanType } from "@/src/types/Subscription";
import { useRouter } from "next/navigation";

export default function SubscriptionPlansPage() {
  const { subscription, plans, isLoading } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<PlanType | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const { upgrade } = useSubscription();
  const router = useRouter();

  const handleSelectPlan = async (planId: PlanType) => {
    // Starter is free — activate directly without checkout
    if (planId === "starter") {
      await upgrade({ planId, cycle: billingCycle });
      router.push("/dashboard/billing/overview");
      return;
    }
    setSelectedPlanId(planId);
    setUpgradeDialogOpen(true);
  };

  const currentPlanId = subscription?.planId || "free";

  return (
    <div className="space-y-8 font-sans">
      <div className="text-center max-w-lg mx-auto">


        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200/60 mt-6 text-xs font-semibold text-gray-600">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${billingCycle === "monthly"
              ? "bg-white text-indigo-700 shadow-sm"
              : "hover:text-gray-900"
              }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${billingCycle === "yearly"
              ? "bg-white text-indigo-700 shadow-sm"
              : "hover:text-gray-900"
              }`}
          >
            Yearly Billing
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase tracking-wide">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid — show all plans (Starter is free) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={currentPlanId}
            billingCycle={billingCycle}
            onSelectPlan={handleSelectPlan}
            isLoading={isLoading}
          />
        ))}
      </div>


      {/* Comparison table */}
      <PricingComparison />

      {/* Confirmation Upgrade dialog */}
      {selectedPlanId && (
        <UpgradeDialog
          open={upgradeDialogOpen}
          onClose={() => {
            setUpgradeDialogOpen(false);
            setSelectedPlanId(null);
          }}
          planId={selectedPlanId}
          billingCycle={billingCycle}
        />
      )}
    </div>
  );
}
