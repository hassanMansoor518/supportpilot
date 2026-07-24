"use client";

import IntegrationsContent from "@/src/components/IntegrationsContent";
import { useSession } from "next-auth/react";

export default function IntegrationsPage() {
  const { data: session } = useSession();

  if (!session) return null;

  return <IntegrationsContent ownerId={session.user.id} />;
}
