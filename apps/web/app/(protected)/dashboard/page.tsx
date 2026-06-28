import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@repo/auth";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

import { LogoutButton } from "~/components/logout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {session.user.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage feature requests and AI-generated Product Requirement
            Documents.
          </p>
        </div>

        <LogoutButton />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PRD Workflow</CardTitle>

              <CardDescription>
                Generate, review and approve AI-created Product Requirement
                Documents.
              </CardDescription>
            </div>

            <Badge variant="secondary">
              Phase 1
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Feature Requests
              </p>

              <p className="mt-2 text-2xl font-bold">
                AI Ready
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                PRD Generation
              </p>

              <p className="mt-2 text-2xl font-bold">
                Automated
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Workflow
              </p>

              <p className="mt-2 text-2xl font-bold">
                Inngest
              </p>
            </div>
          </div>

          <Button asChild>
            <Link href="/dashboard/projects">
              View Projects
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}