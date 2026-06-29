import Link from "next/link";
import { FolderGit2, Plus } from "lucide-react";

import { api } from "~/trpc/server";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { PageHeader } from "~/components/layout/page-header";
import { getCurrentOrganizationOrRedirect } from "~/lib/get-current-organization";

export default async function ProjectsPage() {
  const caller = api();

  const organization = await getCurrentOrganizationOrRedirect();

  const projects = await caller.project.getProjects.query({
    organizationId: organization.id,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      <PageHeader
        title="Projects"
        description="Manage your products and AI delivery workflow."
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Projects",
          },
        ]}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline">Workspace: {organization.name}</Badge>

        <Badge variant="secondary">
          {projects.length} Project
          {projects.length !== 1 && "s"}
        </Badge>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed py-20">
          <CardContent className="flex flex-col items-center space-y-5 text-center">
            <div className="rounded-xl bg-muted p-5">
              <FolderGit2 className="h-10 w-10 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">No projects yet</h2>

              <p className="max-w-md text-muted-foreground">
                Create your first project to start collecting feature requests and generating
                AI-powered Product Requirement Documents.
              </p>
            </div>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{project.name}</CardTitle>

                    <CardDescription>
                      {project.description ?? "No description provided"}
                    </CardDescription>
                  </div>

                  <Badge variant="secondary">{project.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="text-sm text-muted-foreground">{project.slug}</div>

                <Button asChild className="w-full">
                  <Link href={`/dashboard/projects/${project.id}`}>Open Project</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
