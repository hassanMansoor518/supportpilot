"use client"

import React from "react"
import DashboardLeftSide from "./DashboardLeftSide";
import DashboardNavbar from "./DashboardNavbar";
import ChatbotSettings from "./ChatbotSettings";

function DashboardClient({ ownerId }: { ownerId: string }) {

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden">
            <DashboardLeftSide />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <div className="flex-1 p-5 lg:p-5 overflow-auto">
                    <ChatbotSettings ownerId={ownerId} />
                </div>
            </div>
        </div>

    );
}

export default DashboardClient;