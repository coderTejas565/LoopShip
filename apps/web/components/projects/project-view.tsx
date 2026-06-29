import Link from "next/link";
import { ArrowLeft, FolderGit2, Github, GitBranch, Sparkles } from "lucide-react";

import { PageHeader } from "~/components/layout/page-header";

import { Card, CardContent } from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { CreateFeatureDialog } from "~/components/feature/create-feature-dialog";

import { ConnectRepositoryDialog } from "~/components/github/connect-repository-dialog";

type ProjectViewProps = {
  project: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: "active" | "archived";

    githubRepository: string | null;
    githubRepositoryOwner: string | null;
    githubRepositoryName: string | null;

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

            {project.githubRepository ? (
              <Badge className="bg-emerald-600">Connected</Badge>
            ) : (
              <Badge variant="secondary">GitHub Not Connected</Badge>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {project.githubRepository ? (
              <div className="md:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col gap-6 p-6">
                      {/* Header */}
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="flex items-start gap-4">
                          <div className="rounded-xl bg-muted p-3">
                            <Github className="h-7 w-7" />
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground">Connected Repository</p>

                            <h3 className="text-xl font-semibold">
                              {project.githubRepositoryName}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              {project.githubRepositoryOwner}
                            </p>
                          </div>
                        </div>

                        <ConnectRepositoryDialog
                          projectId={project.id}
                          trigger={<Button variant="outline">Change Repository</Button>}
                        />
                      </div>

                      {/* Details */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border p-4">
                          <div className="flex items-center gap-3">
                            <GitBranch className="h-5 w-5 text-muted-foreground" />

                            <div>
                              <p className="text-xs text-muted-foreground">Default Branch</p>

                              <p className="font-medium">{project.defaultBranch}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border p-4">
                          <p className="text-xs text-muted-foreground">Repository URL</p>

                          <p className="font-medium truncate">{project.githubRepository}</p>
                        </div>

                        <div className="rounded-xl border p-4">
                          <p className="text-xs text-muted-foreground">Integration</p>

                          <p className="font-medium text-emerald-600">Active</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid gap-3 md:grid-cols-2">
                        <Button asChild variant="secondary">
                          <a
                            href={`https://github.com/${project.githubRepository}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open on GitHub
                          </a>
                        </Button>

                        <Button disabled>Pull Requests (Coming Soon)</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Github className="mb-5 h-12 w-12 text-muted-foreground" />

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Connect a GitHub Repository</h3>

                    <p className="mx-auto max-w-lg text-sm text-muted-foreground">
                      Connect your GitHub repository to enable AI pull request reviews, release
                      tracking, commit history, and automated engineering workflows.
                    </p>
                  </div>

                  <div className="mt-8">
                    <ConnectRepositoryDialog projectId={project.id} />
                  </div>
                </CardContent>
              </Card>
            )}
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
