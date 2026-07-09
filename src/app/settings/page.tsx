"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Account Security</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your password and authentication methods.</p>
            <Button variant="outline">Change Password</Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">Log out from this device.</p>
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/login' })}>
              Log out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
