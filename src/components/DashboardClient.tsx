"use client"

import React from "react"

function DashboardClient({ ownerId }: { ownerId: string }) {

    return (
        <div>
            Dashboard Client {ownerId}
        </div>

    );
}

export default DashboardClient;