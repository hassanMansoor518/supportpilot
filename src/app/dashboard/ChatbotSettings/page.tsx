"use client";

import ChatbotSettings from "@/src/components/ChatbotSettings";
import { useSession } from "next-auth/react";

export default function ChatbotSettingsPage() {
  const { data: session } = useSession();

  if (!session) return null;

  return <ChatbotSettings ownerId={session.user.id} />;
}
