"use client";

import React from "react";
import { useBilling } from "@/src/hooks/useBilling";
import CurrentPlanCard from "@/src/components/billing/CurrentPlanCard";
import UsageCard from "@/src/components/billing/UsageCard";
import InvoiceTable from "@/src/components/billing/InvoiceTable";
import UpgradeBanner from "@/src/components/billing/UpgradeBanner";
import BillingSkeleton from "@/src/components/billing/BillingSkeleton";
import EmptyBilling from "@/src/components/billing/EmptyBilling";
import {
  ArrowRight,
  Star,
  Zap,
  Bot,
  ShieldCheck,
  BarChart3,
  Layers,
  Check,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/src/services/mockDb";

// ---------------------------------------------------------------------------
// First-time user premium onboarding UI
// ---------------------------------------------------------------------------
function FirstTimeUserView() {
  const router = useRouter();

  const highlights = [
    {
      icon: Bot,
      title: "Deploy AI Chatbots",
      description: "Build and launch intelligent support agents on your website in minutes.",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: Zap,
      title: "Advanced AI Models",
      description: "Access GPT-4o and Claude 3.5 Sonnet for human-level conversation quality.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track conversation quality, CSAT scores, and resolution rates at a glance.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description: "SOC-2 ready infrastructure with end-to-end encryption on every message.",
      color: "bg-blue-50 text-blue-600",
    },
  ];

  const quickSteps = [
    { num: "01", label: "Pick a plan below — Starter is free" },
    { num: "02", label: "Create your first AI chatbot" },
    { num: "03", label: "Embed on any site with one line of code" },
  ];

  return (
    <div className="space-y-10 font-sans">

      {/* ── Hero welcome banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl p-8 md:p-10 text-white shadow-lg">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/20 px-3 py-1 rounded-full mb-5">
              <Rocket size={11} />
              Welcome to SupportPilot
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Your AI support team<br />
              <span className="text-indigo-200">starts here.</span>
            </h1>
            <p className="text-indigo-200 text-sm mt-3 leading-relaxed font-medium max-w-sm">
              Choose a plan to deploy smart chatbots, automate customer support, and grow your business with AI — no coding required.
            </p>

            {/* Quick steps */}
            <div className="mt-6 flex flex-col gap-2">
              {quickSteps.map((step) => (
                <div key={step.num} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="text-[11px] font-extrabold text-indigo-300 w-6 shrink-0">
                    {step.num}
                  </span>
                  <span className="text-indigo-100">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={() => router.push("/dashboard/billing/subscription")}
              className="flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg cursor-pointer active:scale-95"
            >
              View All Plans <ArrowRight size={16} />
            </button>
            <p className="text-[10px] text-indigo-300 text-center font-semibold">
              No credit card required for Starter
            </p>
          </div>
        </div>
      </div>

      {/* ── Feature highlights grid ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">
          Why SupportPilot?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{h.title}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">
                    {h.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Plan teaser cards ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">
          Get Started — Pick Your Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Starter (Free) */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-gray-900">Starter</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wide">
                Free
              </span>
            </div>
            <div className="text-3xl font-black text-gray-900">$0<span className="text-sm font-semibold text-gray-400">/mo</span></div>
            <ul className="space-y-1.5 text-xs text-gray-600 font-semibold">
              {["3 AI Chatbots", "1,000 Messages/mo", "Email Support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/dashboard/billing/subscription")}
              className="mt-auto w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro — highlighted */}
          <div className="relative bg-indigo-600 rounded-2xl p-5 shadow-md flex flex-col gap-4 text-white">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-amber-400 text-amber-900 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wide shadow">
              <Sparkles size={10} className="fill-amber-700" /> Most Popular
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold">Pro</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 rounded-full">Recommended</span>
            </div>
            <div className="text-3xl font-black">$49<span className="text-sm font-semibold text-indigo-200">/mo</span></div>
            <ul className="space-y-1.5 text-xs font-semibold text-indigo-100">
              {["10 AI Chatbots", "10,000 Messages/mo", "GPT-4o & Claude 3.5", "Priority Support (1h)"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-indigo-300 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/dashboard/billing/checkout?plan=pro&cycle=monthly")}
              className="mt-auto w-full py-2 bg-white hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Business */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-gray-900">Business</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Scale</span>
            </div>
            <div className="text-3xl font-black text-gray-900">$99<span className="text-sm font-semibold text-gray-400">/mo</span></div>
            <ul className="space-y-1.5 text-xs text-gray-600 font-semibold">
              {["30 AI Chatbots", "50,000 Messages/mo", "Dedicated Manager"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-indigo-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/dashboard/billing/checkout?plan=business&cycle=monthly")}
              className="mt-auto w-full py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Get Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
