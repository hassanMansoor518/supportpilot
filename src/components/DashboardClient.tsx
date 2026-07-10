"use client"

import React from "react"
import DashboardLeftSide from "./DashboardLeftSide";
import DashboardNavbar from "./DashboardNavbar";

function DashboardClient({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden">
            <DashboardLeftSide />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <div className="flex-1 p-5 lg:p-5 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardClient;