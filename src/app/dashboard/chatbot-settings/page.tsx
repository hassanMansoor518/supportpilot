"use client";

import ChatbotSettings from "@/src/components/ChatbotSettings";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChatbotSettingsWrapper() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const botId = searchParams.get("id");

  if (!session) return null;

  return <ChatbotSettings ownerId={session.user.id} botId={botId} />;
}

export default function ChatbotSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ChatbotSettingsWrapper />
    </Suspense>
  );
}


