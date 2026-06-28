import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@repo/auth";

import {
  ArrowRight,
  FolderGit2,
  FileText,
  Sparkles,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { LogoutButton } from "~/components/logout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-8">
      {/* Hero */}

      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <Badge>
            AI Product Workspace
          </Badge>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back,
              <br />
              {session.user.name}
            </h1>

            <p className="max-w-2xl text-muted-foreground">
              Manage projects, collect feature requests,
              generate AI-powered Product Requirement
              Documents and ship features faster.
            </p>
          </div>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/dashboard/projects">
                Open Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-colors hover:border-primary">
          <CardHeader>
            <FolderGit2 className="h-8 w-8 text-primary" />

            <CardTitle className="mt-4">
              Projects
            </CardTitle>

            <CardDescription>
              Organize products and manage your
              development workflow.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/dashboard/projects">
                View Projects
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-colors hover:border-primary">
          <CardHeader>
            <Sparkles className="h-8 w-8 text-primary" />

            <CardTitle className="mt-4">
              AI PRDs
            </CardTitle>

            <CardDescription>
              Generate structured Product Requirement
              Documents automatically.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Badge variant="secondary">
              Powered by AI
            </Badge>
          </CardContent>
        </Card>

        <Card className="transition-colors hover:border-primary">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary" />

            <CardTitle className="mt-4">
              Workflow
            </CardTitle>

            <CardDescription>
              Feature Request → AI PRD → Review →
              Approval → Build
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Badge>
              Inngest Automation
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Workflow */}

      <Card>
        <CardHeader>
          <CardTitle>
            LoopShip Workflow
          </CardTitle>

          <CardDescription>
            Every feature follows the same pipeline.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="outline">
              Feature Request
            </Badge>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <Badge variant="outline">
              AI PRD
            </Badge>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <Badge variant="outline">
              Review
            </Badge>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <Badge variant="outline">
              Approval
            </Badge>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <Badge variant="outline">
              Development
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}