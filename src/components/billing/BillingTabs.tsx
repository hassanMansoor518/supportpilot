"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { LayoutDashboard, CreditCard, ShieldCheck, FileText, BarChart3 } from "lucide-react";

export default function BillingTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      href: "/dashboard/billing/overview",
      icon: LayoutDashboard,
    },
    {
      id: "subscription",
      name: "Subscription",
      href: "/dashboard/billing/subscription",
      icon: ShieldCheck,
    },
    {
      id: "payment-methods",
      name: "Payment Methods",
      href: "/dashboard/billing/payment-methods",
      icon: CreditCard,
    },
    {
      id: "invoices",
      name: "Invoices",
      href: "/dashboard/billing/invoices",
      icon: FileText,
    },
    {
      id: "usage",
      name: "Usage",
      href: "/dashboard/billing/usage",
      icon: BarChart3,
    },
  ];

  // Helper to determine if a tab is active
  const isActive = (href: string) => {
    if (href === "/dashboard/billing/overview") {
      return pathname === "/dashboard/billing" || pathname === "/dashboard/billing/overview";
    }
    return pathname === href;
  };

  return (
    <div className="border-b border-gray-100 mb-8 overflow-x-auto scrollbar-none font-sans">
      <div className="flex space-x-1 min-w-max p-1">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                active ? "text-indigo-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon size={16} className={active ? "text-indigo-600" : "text-gray-400"} />
              <span>{tab.name}</span>

              {active && (
                <motion.div
                  layoutId="activeBillingTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
