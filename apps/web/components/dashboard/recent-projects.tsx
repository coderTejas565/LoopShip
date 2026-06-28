import Link from "next/link";

import {
  ArrowRight,
  FolderGit2,
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

type RecentProjectsProps = {
  projects: {
    id: string;
    name: string;
    description: string | null;
    status: "active" | "archived";
    slug: string;
  }[];
};

export function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Recent Projects
          </CardTitle>

          <CardDescription>
            Continue working on your latest products.
          </CardDescription>
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
        >
          <Link href="/dashboard/projects">
            View all

            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderGit2 className="mb-4 h-12 w-12 text-muted-foreground/50" />

            <h3 className="font-semibold">
              No projects yet
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first project to start shipping features.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link href="/dashboard/projects">
                Create Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="h-4 w-4 text-primary" />

                    <h3 className="font-medium transition-colors group-hover:text-primary">
                      {project.name}
                    </h3>

                    <Badge
                      variant={
                        project.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                    {project.description ??
                      "No description provided."}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}