"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BillingHeader from "@/src/components/billing/BillingHeader";
import BillingTabs from "@/src/components/billing/BillingTabs";

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isCheckoutFlow =
    pathname.includes("/checkout") ||
    pathname.includes("/success") ||
    pathname.includes("/cancel");

  if (isCheckoutFlow) {
    return (
      <div className="w-full min-h-screen bg-gray-50/50 py-10 px-4 md:px-8 font-sans flex items-center justify-center">
        <div className="w-full max-w-5xl">{children}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-4 py-4 font-sans">
      <BillingHeader />
      <BillingTabs />
      <main className="bg-white border border-gray-200/60 rounded-2xl p-5 md:p-6 shadow-sm">
        {children}
      </main>
    </div>
  );
}

