"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { LayoutDashboard, CreditCard, ShieldCheck, FileText, BarChart3, HelpCircle, ShieldAlert } from "lucide-react";

export default function BillingSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Overview",
      href: "/dashboard/billing/overview",
      icon: LayoutDashboard,
    },
    {
      name: "Subscription",
      href: "/dashboard/billing/subscription",
      icon: ShieldCheck,
    },
    {
      name: "Payment Methods",
      href: "/dashboard/billing/payment-methods",
      icon: CreditCard,
    },
    {
      name: "Invoices",
      href: "/dashboard/billing/invoices",
      icon: FileText,
    },
    {
      name: "Usage",
      href: "/dashboard/billing/usage",
      icon: BarChart3,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard/billing/overview") {
      return pathname === "/dashboard/billing" || pathname === "/dashboard/billing/overview";
    }
    return pathname === href;
  };

  return (
    <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-6 font-sans">
      {/* Navigation Links */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Billing Navigation
        </div>
        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
          {links.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap lg:w-full",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon size={16} className={active ? "text-indigo-650" : "text-gray-450"} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Security Badge */}
      <div className="hidden lg:flex bg-gray-50/50 border border-gray-200/60 rounded-2xl p-4.5 flex-col gap-3.5">
        <div className="flex items-start gap-2.5">
          <ShieldAlert size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-gray-800">Secure Payments</div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-medium">
              All transactions are secured by 256-bit SSL encryption.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <HelpCircle size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-gray-800">PCI Compliant</div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-medium">
              We never store your complete credit card information. Payments processed via Stripe.
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
