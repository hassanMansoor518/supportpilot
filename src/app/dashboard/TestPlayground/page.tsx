import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/src/lib/auth";
import TestPlaygroundClient from "@/src/components/TestPlaygroundClient";

export default async function TestPlaygroundPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <TestPlaygroundClient ownerId={session.user.id} />;
}
