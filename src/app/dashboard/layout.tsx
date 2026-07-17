import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/src/lib/auth";
import DashboardLeftSide from "@/src/components/DashboardLeftSide";
import DashboardNavbar from "@/src/components/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden">
      <DashboardLeftSide />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar session={session} />
        <div className="flex-1 p-5 lg:p-5 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
