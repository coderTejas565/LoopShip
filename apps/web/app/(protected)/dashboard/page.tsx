import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@repo/auth";

import {
  ArrowRight,
  FolderGit2,
  Sparkles,
} from "lucide-react";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const caller = api();

  const organization =
    await caller.organization.getCurrentOrganization.query();

  const projects =
    await caller.project.getProjects.query({
      organizationId: organization.id,
    });

  return (
    <div className="space-y-10">

      {/* Hero */}

      <section className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back,
            {" "}
            {session.user.name}
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage projects, collect feature requests,
            generate PRDs with AI and keep your product
            development moving.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/projects">
              Open Projects
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
          >
            <Link href="/dashboard/projects">
              Create Project
            </Link>
          </Button>
        </div>
      </section>

      {/* Recent Projects */}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Recent Projects
          </h2>

          <Button
            variant="ghost"
            asChild
          >
            <Link href="/dashboard/projects">
              View all

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-14 text-center">
              <FolderGit2 className="mb-4 h-10 w-10 text-muted-foreground" />

              <h3 className="text-lg font-semibold">
                No projects yet
              </h3>

              <p className="mt-2 max-w-md text-muted-foreground">
                Create your first project to begin
                collecting feature requests and generating
                AI-powered PRDs.
              </p>

              <Button
                className="mt-6"
                asChild
              >
                <Link href="/dashboard/projects">
                  Create Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Card
                key={project.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle>
                    {project.name}
                  </CardTitle>

                  <CardDescription>
                    {project.description ??
                      "No description"}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                    >
                      Open Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Workflow */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />

            <CardTitle>
              AI Workflow
            </CardTitle>
          </div>

          <CardDescription>
            Every feature follows the same delivery pipeline.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <span>Feature Request</span>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <span>AI PRD</span>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <span>Review</span>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <span>Approval</span>

            <ArrowRight className="h-4 w-4 text-muted-foreground" />

            <span>Development</span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}