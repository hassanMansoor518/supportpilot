"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      {session ? (
        <div className="text-center space-y-6">
          <p className="text-xl">Welcome back, {session.user?.name || session.user?.email}!</p>
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">Your Account Details</h2>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>Role:</strong> {session.user?.role || "User"}</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => window.location.href = "/profile"}>
              Go to Profile
            </Button>
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/' })}>
              Log out
            </Button>
          </div>
        </div>
      ) : (
        <p>Loading your dashboard...</p>
      )}
    </div>
  );
}
