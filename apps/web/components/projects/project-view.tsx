import Link from "next/link";
import { ArrowLeft, FolderGit2, Github, GitBranch, Sparkles } from "lucide-react";

import { PageHeader } from "~/components/layout/page-header";

import { Card, CardContent } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { CreateFeatureDialog } from "~/components/feature/create-feature-dialog";

type ProjectViewProps = {
  project: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: "active" | "archived";
    githubRepository: string | null;
    defaultBranch: string | null;
  };

  features: {
    id: string;
    title: string;
    source: string;
    status: string;
  }[];
};

export function ProjectView({ project, features }: ProjectViewProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">
      <PageHeader
        backHref="/dashboard/projects"
        backLabel="Projects"
        title={project.name}
        description={project.description ?? "No description has been added yet."}
        actions={<CreateFeatureDialog projectId={project.id} />}
      />

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{project.status}</Badge>

            <Badge variant="outline">{project.slug}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <GitBranch className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">Default Branch</p>

                <p className="font-medium">{project.defaultBranch ?? "Not configured"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Github className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">GitHub Repository</p>

                <p className="font-medium">{project.githubRepository ?? "Not connected"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Feature Requests</h2>

            <p className="text-sm text-muted-foreground">
              Customer ideas waiting to become AI-generated PRDs.
            </p>
          </div>

          <Badge variant="secondary">{features.length} Features</Badge>
        </div>

        {features.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Sparkles className="mb-4 h-10 w-10 text-muted-foreground" />

              <h3 className="text-lg font-semibold">No feature requests yet</h3>

              <p className="mt-2 max-w-md text-muted-foreground">
                Create your first feature request to start the AI-powered product delivery workflow.
              </p>

              <div className="mt-6">
                <CreateFeatureDialog projectId={project.id} />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className="transition-all hover:border-primary hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="h-5 w-5 text-primary" />

                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>

                    <div className="flex gap-2">
                      <Badge variant="outline">{feature.source}</Badge>

                      <Badge variant="secondary">{feature.status}</Badge>
                    </div>
                  </div>

                  <Button asChild variant="outline">
                    <Link href={`/dashboard/features/${feature.id}`}>Open</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
