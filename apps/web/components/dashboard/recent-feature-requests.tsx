import Link from "next/link";

import { ArrowRight, MessageSquarePlus } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

type RecentFeatureRequestsProps = {
  features: {
    id: string;
    title: string;
    status: string;
    source: string;

    project: {
      id: string;
      name: string;
    };
  }[];
};

function getStatusVariant(status: string) {
  switch (status) {
    case "approved":
      return "default";

    case "prd_generated":
      return "secondary";

    case "clarification_needed":
      return "destructive";

    case "rejected":
      return "outline";

    default:
      return "outline";
  }
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function RecentFeatureRequests({ features }: RecentFeatureRequestsProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle>Recent Feature Requests</CardTitle>

          <CardDescription>Track incoming ideas and AI processing status.</CardDescription>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/projects">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {features.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageSquarePlus className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">No feature requests yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a feature request from a project.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={`/dashboard/features/${feature.id}`}
                className="
                group
                flex
                items-center
                justify-between
                px-6
                py-5
                transition
                hover:bg-muted/50
                "
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    bg-primary/10
                    "
                    >
                      <MessageSquarePlus className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <h3
                        className="
                      font-medium
                      group-hover:text-primary
                      "
                      >
                        {feature.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">{feature.project.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusVariant(feature.status)}>
                      {formatStatus(feature.status)}
                    </Badge>

                    <Badge variant="outline">{feature.source}</Badge>
                  </div>
                </div>

                <ArrowRight
                  className="
                  h-4 w-4
                  text-muted-foreground
                  transition
                  group-hover:translate-x-1
                  "
                />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
