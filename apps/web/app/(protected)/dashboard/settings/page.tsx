import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth";

import { User, Building2, Settings } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <div className="flex items-center gap-3">
          <Settings className="h-7 w-7 text-primary" />

          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        </div>

        <p className="mt-2 text-muted-foreground">Manage your account and workspace preferences.</p>
      </div>

      {/* Account */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />

            <div>
              <CardTitle>Account</CardTitle>

              <CardDescription>Your personal information.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p className="mt-1 font-medium">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="mt-1 font-medium">{session.user.email}</p>
          </div>

          <Badge variant="secondary">Active Account</Badge>
        </CardContent>
      </Card>

      {/* Workspace */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />

            <div>
              <CardTitle>Workspace</CardTitle>

              <CardDescription>Manage your product workspace.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border p-5">
            <p className="font-medium">Current Workspace</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Organization settings will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
