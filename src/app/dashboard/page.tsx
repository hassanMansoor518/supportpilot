"use client";

import DashboardClient from "@/src/components/DashboardClient";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();

  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <DashboardClient ownerId={session.user.id} />
    </div>
  );
}
