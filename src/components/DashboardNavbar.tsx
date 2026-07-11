"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, HelpCircle, Sun, ChevronRight, ChevronDown, LogOut, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface DashboardNavbarProps {
  session?: Session | null;
}

export default function DashboardNavbar({ session }: DashboardNavbarProps) {
  const user = session?.user;
  const displayName = user?.name ?? "Guest";
  const displayEmail = user?.email ?? "";
  const displayInitial = displayName.charAt(0).toUpperCase();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* Right: Icons, Profile */}
      <div className="flex items-center gap-5">
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

        {/* Profile + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-2 rounded-xl transition-colors"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 border border-indigo-700 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{displayInitial}</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900 leading-tight capitalize">
                  {displayName}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-100/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User info header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">{displayInitial}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate capitalize">{displayName}</p>
                    {displayEmail && (
                      <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={15} className="text-gray-400" />
                  Profile
                </button>

                <div className="my-1 border-t border-gray-100" />

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} className="text-red-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
