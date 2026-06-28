import Link from "next/link";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function ProjectsPage() {
  const caller = api();

  // Get the user's current workspace
  const organization =
    await caller.organization.getCurrentOrganization.query();

  // Load projects for that workspace
  const projects =
    await caller.project.getProjects.query({
      organizationId: organization.id,
    });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your products and AI delivery workflow.
          </p>
        </div>

        <Button>
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="py-20">
          <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="text-5xl">📦</div>

            <div>
              <h2 className="text-xl font-semibold">
                No projects yet
              </h2>

              <p className="mt-2 text-muted-foreground">
                Create your first project to start collecting feature
                requests and generating AI-powered PRDs.
              </p>
            </div>

            <Button>
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>
                      {project.name}
                    </CardTitle>

                    <CardDescription className="mt-2">
                      {project.description ?? "No description"}
                    </CardDescription>
                  </div>

                  <Badge variant="secondary">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {project.slug}
                </span>

                <Button
                  asChild
                  size="sm"
                >
                  <Link href={`/dashboard/projects/${project.id}`}>
                    Open
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}