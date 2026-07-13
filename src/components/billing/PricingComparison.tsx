"use client";

import React from "react";
import { Check, Minus } from "lucide-react";

export default function PricingComparison() {
  const categories = [
    {
      name: "Usage & Limits",
      features: [
        { name: "Active Chatbots", free: "1", starter: "3", pro: "10", business: "30" },
        { name: "Messages / month", free: "100", starter: "1,000", pro: "10,000", business: "50,000" },
        { name: "File Storage", free: "5MB", starter: "50MB", pro: "500MB", business: "2GB" },
        { name: "Monthly API Calls", free: "100", starter: "1,000", pro: "10,000", business: "50,000" },
      ],
    },
    {
      name: "AI Models & Capabilities",
      features: [
        { name: "GPT-3.5 / Basic Models", free: true, starter: true, pro: true, business: true },
        { name: "GPT-4o & Claude 3.5", free: false, starter: false, pro: true, business: true },
        { name: "Custom System Prompts", free: false, starter: true, pro: true, business: true },
        { name: "Knowledge Base Training", free: "Website only", starter: "Files & Website", pro: "Files, Website & QA", business: "All + Database Sync" },
      ],
    },
    {
      name: "Customization & Branding",
      features: [
        { name: "Chat Widget Customization", free: "Basic Colors", starter: "Themes & Layouts", pro: "Full CSS + Themes", business: "Full CSS + Themes" },
        { name: "Remove 'Powered by' logo", free: false, starter: false, pro: true, business: true },
        { name: "Custom Domain embed", free: false, starter: false, pro: false, business: true },
      ],
    },
    {
      name: "Support & Security",
      features: [
        { name: "Support Tier", free: "Community", starter: "Email", pro: "Priority (1h)", business: "Dedicated Manager" },
        { name: "Uptime SLA", free: "None", starter: "None", pro: "99.5%", business: "99.9%" },
        { name: "SSO/SAML Login", free: false, starter: false, pro: false, business: false },
      ],
    },
  ];

  const renderVal = (val: any) => {
    if (val === true) return <Check size={16} className="text-indigo-600 mx-auto" />;
    if (val === false) return <Minus size={16} className="text-gray-300 mx-auto" />;
    return <span className="text-xs font-semibold text-gray-700">{val}</span>;
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden font-sans mt-12">
      <div className="p-5 border-b border-gray-100 bg-gray-50/30">
        <h3 className="text-lg font-bold text-gray-900">Compare Plans & Features</h3>
        <p className="text-xs text-gray-500 mt-1">Detailed comparison to find the perfect fit for your workload.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse table-fixed min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <th className="px-6 py-4 text-left w-[240px]">Feature</th>
              <th className="px-4 py-4 w-[110px]">
                Free
              </th>
              <th className="px-4 py-4 w-[110px]">
                <div className="flex flex-col items-center gap-1">
                  <span>Starter</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                    Free
                  </span>
                </div>
              </th>
              <th className="px-4 py-4 w-[110px] border-x border-indigo-100 bg-indigo-50/20 text-indigo-700">Pro</th>
              <th className="px-4 py-4 w-[110px]">Business</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {categories.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                {/* Category Header */}
                <tr className="bg-gray-50/30">
                  <td colSpan={5} className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100/40">
                    {cat.name}
                  </td>
                </tr>
                {cat.features.map((feat, featIdx) => (
                  <tr key={featIdx} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-6 py-3.5 text-left font-semibold text-gray-800 text-xs md:text-sm">
                      {feat.name}
                    </td>
                    <td className="px-4 py-3.5">{renderVal(feat.free)}</td>
                    <td className="px-4 py-3.5">{renderVal(feat.starter)}</td>
                    <td className="px-4 py-3.5 border-x border-indigo-50 bg-indigo-50/5 font-semibold text-indigo-900">{renderVal(feat.pro)}</td>
                    <td className="px-4 py-3.5">{renderVal(feat.business)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
