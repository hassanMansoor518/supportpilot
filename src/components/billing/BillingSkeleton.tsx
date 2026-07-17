"use client";

import React from "react";

export default function BillingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse font-sans w-full">
      <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-24" />
            <div className="h-8 bg-gray-200 rounded w-48" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="h-12 bg-gray-100 rounded-xl" />
          <div className="h-12 bg-gray-100 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-150 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded-full w-20" />
              <div className="h-4 bg-gray-200 rounded-full w-12" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-2 bg-gray-100 rounded-full w-full" />
            <div className="flex justify-between">
              <div className="h-3 bg-gray-100 rounded-full w-12" />
              <div className="h-3 bg-gray-100 rounded-full w-16" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-150 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="h-9 bg-gray-150 rounded-xl w-64" />
          <div className="h-9 bg-gray-150 rounded-xl w-32" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded-full w-20" />
        <div className="h-4 bg-gray-200 rounded-full w-12" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-24" />
      <div className="h-2 bg-gray-100 rounded-full w-full" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded w-full" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-6 space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-[250px] bg-gray-50 rounded-xl flex items-end justify-around p-4 gap-2">
        <div className="w-8 bg-gray-200 rounded-t h-[40%]" />
        <div className="w-8 bg-gray-200 rounded-t h-[60%]" />
        <div className="w-8 bg-gray-200 rounded-t h-[30%]" />
        <div className="w-8 bg-gray-200 rounded-t h-[80%]" />
        <div className="w-8 bg-gray-200 rounded-t h-[95%]" />
        <div className="w-8 bg-gray-200 rounded-t h-[50%]" />
      </div>
    </div>
  );
}
