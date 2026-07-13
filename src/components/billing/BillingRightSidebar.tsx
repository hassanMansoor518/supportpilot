"use client";

import React from "react";
import { HelpCircle, Mail, ShieldCheck, Lock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BillingRightSidebar() {
  const faqs = [
    { q: "Can I cancel anytime?", a: "Yes, cancel anytime from your dashboard. Access remains active until the end of your billing cycle." },
    { q: "What models are included?", a: "Pro plans include Claude 3.5 Sonnet, GPT-4o, and unlimited access to standard models." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for initial payments if you are not fully satisfied." }
  ];

  return (
    <aside className="w-full xl:w-72 shrink-0 flex flex-col gap-6 font-sans">
      {/* Need Help Card */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
          <HelpCircle size={16} className="text-indigo-650" />
          Need Help?
        </h4>

        {/* FAQs */}
        <div className="mt-4 space-y-3.5">
          {faqs.map((faq, i) => (
            <div key={i} className="text-xs">
              <div className="font-bold text-gray-800 flex items-start gap-1">
                <ChevronRight size={12} className="text-indigo-650 shrink-0 mt-0.5" />
                {faq.q}
              </div>
              <div className="text-gray-500 mt-1 leading-relaxed pl-4 font-semibold">
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Mail size={14} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Billing Support</div>
            <a
              href="mailto:billing@supportpilot.com"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              billing@supportpilot.com
            </a>
          </div>
        </div>
      </div>

      {/* Trust & Security Badge Card */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/60 rounded-2xl p-5 flex flex-col gap-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Security & Trust
        </h4>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800">PCI-DSS Compliant</div>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-semibold">
              Payment details are encrypted and processed by Stripe. We never store credit cards on our servers.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650 shrink-0">
            <Lock size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800">SSL Encrypted Checkout</div>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-semibold">
              All interactions and transactions are safeguarded by industrial 256-bit SSL encryption keys.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
