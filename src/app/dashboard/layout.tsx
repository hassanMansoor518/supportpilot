"use client";

import DashboardClient from "@/src/components/DashboardClient";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) return <div>Not authenticated</div>;

  return <DashboardClient>{children}</DashboardClient>;
}
