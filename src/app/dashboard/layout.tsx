import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/src/lib/auth";
import DashboardClient from "@/src/components/DashboardClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardClient session={session}>{children}</DashboardClient>;
}
