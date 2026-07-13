"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PLANS } from "@/src/services/mockDb";
import { PlanType, BillingCycle, Plan } from "@/src/types/Subscription";
import { useSubscription } from "@/src/hooks/useSubscription";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import OrderSummary from "@/src/components/billing/OrderSummary";
import CouponInput from "@/src/components/billing/CouponInput";
import { Lock, ArrowLeft, Loader2, CreditCard, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { upgrade, isUpgrading } = useSubscription();
  const { paymentMethods, isLoading: isCardsLoading } = usePaymentMethods();

  const planId = (searchParams.get("plan") || "pro") as PlanType;
  const cycle = (searchParams.get("cycle") || "monthly") as BillingCycle;

  const plan = PLANS.find((p) => p.id === planId) as Plan;
  
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // If plan is invalid, redirect to pricing
  if (!plan) {
    router.push("/dashboard/billing/subscription");
    return null;
  }

  // Pre-select default card
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !selectedCardId) {
      const defaultCard = paymentMethods.find((p) => p.isDefault);
      setSelectedCardId(defaultCard ? defaultCard.id : paymentMethods[0].id);
    }
  }, [paymentMethods, selectedCardId]);

  const handleApplyCoupon = (percent: number, code: string) => {
    setDiscountPercent(percent);
    setAppliedCode(code);
    toast.success(`Coupon ${code} applied successfully!`);
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setAppliedCode(null);
    toast.success("Coupon removed.");
  };

  const handlePay = async () => {
    if (paymentMethods.length === 0) {
      toast.error("Please add a payment method before purchasing.");
      router.push("/dashboard/billing/payment-methods");
      return;
    }

    try {
      // Complete subscription upgrade mock transition
      await upgrade({ planId: plan.id, cycle });
      
      // Calculate final total to pass to success screen
      const basePrice = cycle === "monthly" ? plan.price : Math.round(plan.price * 12 * 0.8);
      const discount = basePrice * (discountPercent / 100);
      const subtotal = basePrice - discount;
      const tax = subtotal * 0.1;
      const total = subtotal + tax;

      toast.success("Transaction completed successfully!");
      router.push(`/dashboard/billing/success?plan=${plan.id}&cycle=${cycle}&total=${total.toFixed(2)}`);
    } catch (err: any) {
      toast.error(err.message || "Payment transaction failed.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Checkout Navbar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <Link
          href="/dashboard/billing/subscription"
          className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </Link>
        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Lock size={12} className="text-emerald-500" />
          Secure Checkout
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Payment Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-extrabold text-gray-900">Secure Payment Details</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Verify your billing address and choose a card from your account to complete this transaction.
            </p>

            {/* Billing Card Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Select Card
              </label>

              {isCardsLoading ? (
                <div className="h-14 bg-gray-50 border border-gray-150 rounded-xl animate-pulse" />
              ) : paymentMethods.length > 0 ? (
                <div className="space-y-2.5">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedCardId === method.id;

                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedCardId(method.id)}
                        className={`w-full text-left p-3.5 border rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-7 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-black uppercase tracking-tighter text-gray-500 italic">
                            {method.brand}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-gray-800">
                              •••• {method.last4}
                            </span>
                            <span className="text-xs text-gray-450 block font-semibold mt-0.5">
                              Exp: {method.expiryMonth}/{method.expiryYear}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <Check size={12} strokeWidth={2.5} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 text-center border border-dashed border-gray-200 rounded-xl space-y-3">
                  <p className="text-sm text-gray-500 font-semibold">No billing cards on file.</p>
                  <button
                    onClick={() => router.push("/dashboard/billing/payment-methods")}
                    className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Add Credit Card
                  </button>
                </div>
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="border-t border-gray-100 pt-5">
              <CouponInput
                onApply={handleApplyCoupon}
                onRemove={handleRemoveCoupon}
                appliedCode={appliedCode}
              />
            </div>

            {/* Pay Button */}
            <div className="border-t border-gray-100 pt-5">
              <button
                onClick={handlePay}
                disabled={isUpgrading || paymentMethods.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-extrabold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-100 hover:shadow active:scale-[0.98] disabled:opacity-50"
              >
                {isUpgrading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Secure Purchase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5">
          <OrderSummary
            plan={plan}
            billingCycle={cycle}
            discountPercent={discountPercent}
            appliedCode={appliedCode}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={32} className="animate-spin text-indigo-650" />
          <span className="text-sm font-semibold text-gray-500">Loading checkout parameters...</span>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
