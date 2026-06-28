import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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

export function ProjectView({
  project,
  features,
}: ProjectViewProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {project.name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {project.description ?? "No description provided."}
          </p>
        </div>

        <Badge variant="secondary">
          {project.status}
        </Badge>
      </div>

      {/* Project Info */}

      <Card>
        <CardHeader>
          <CardTitle>
            Project Details
          </CardTitle>

          <CardDescription>
            Basic information about this project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div>
            <span className="font-medium">
              Slug:
            </span>{" "}
            {project.slug}
          </div>

          <div>
            <span className="font-medium">
              Default Branch:
            </span>{" "}
            {project.defaultBranch ?? "Not configured"}
          </div>

          <div>
            <span className="font-medium">
              GitHub Repository:
            </span>{" "}
            {project.githubRepository ??
              "Not connected"}
          </div>
        </CardContent>
      </Card>

      {/* Feature Requests */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Feature Requests
            </CardTitle>

            <CardDescription>
              Customer requests and ideas for this
              project.
            </CardDescription>
          </div>

<CreateFeatureDialog
  projectId={project.id}
/>
        </CardHeader>

        <CardContent>
          {features.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No feature requests yet.
            </div>
          ) : (
            <div className="space-y-3">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="transition-all hover:border-primary"
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">
                        {feature.title}
                      </h3>

                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                        >
                          {feature.source}
                        </Badge>

                        <Badge
                          variant="secondary"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                    >
                      <Link
                        href={`/dashboard/features/${feature.id}`}
                      >
                        Open
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}