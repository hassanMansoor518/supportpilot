import React from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Sun,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function DashboardNavbar() {
  return (
    <div className="h-[72px] w-full bg-white border-b border-gray-100 flex items-center justify-between px-6 font-sans">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
          Settings
        </span>
        <ChevronRight size={16} className="text-gray-400" />
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-gray-900">Chatbot Settings</span>
          <ChevronDown size={14} className="text-gray-500 mt-0.5" />
        </div>
      </div>

      {/* Right: Search, Icons, Profile */}
      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-12 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm w-[280px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900 placeholder:text-gray-400"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <div className="flex items-center justify-center px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 shadow-sm">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-200"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          <button className="relative hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white">
              3
            </div>
          </button>

          <button className="hover:text-gray-900 transition-colors">
            <HelpCircle size={20} />
          </button>

          <button className="hover:text-gray-900 transition-colors">
            <Sun size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-200 ml-1"></div>

        {/* Profile */}
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-2 rounded-xl transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan&backgroundColor=c0aede"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900 leading-tight">Hassan Mansoor</span>
              <span className="text-xs text-gray-500">Owner</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  );
}
