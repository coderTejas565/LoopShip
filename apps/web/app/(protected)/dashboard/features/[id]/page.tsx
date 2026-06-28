import Link from "next/link";

import { api } from "~/trpc/server";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default async function FeaturePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const caller = api();

  const feature = await caller.featureRequest.getFeatureRequest.query({
    featureRequestId: id,
  });

  const prd = await caller.prd.getPRDByFeatureRequest.query({
    featureRequestId: id,
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      {/* Header */}

      <div className="space-y-5">
        <Link
          href={`/dashboard/projects/${feature.projectId}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Project
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">{feature.title}</h1>

            <p className="max-w-3xl text-muted-foreground">{feature.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{feature.status}</Badge>

              <Badge variant="outline">{feature.source}</Badge>

              <Badge variant="outline">{prd ? "PRD Generated" : "Generating PRD"}</Badge>
            </div>
          </div>

          {prd && (
            <Button asChild>
              <Link href={`/dashboard/prds/${prd.id}`}>Open PRD</Link>
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Overview */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Feature Description</CardTitle>

            <CardDescription>Original customer request</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="leading-8 whitespace-pre-wrap text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Status</p>

              <Badge className="mt-2">{feature.status}</Badge>
            </div>

            <Separator />

            <div>
              <p className="text-xs uppercase text-muted-foreground">Source</p>

              <p className="mt-2 font-medium capitalize">{feature.source}</p>
            </div>

            <Separator />

            <div>
              <p className="text-xs uppercase text-muted-foreground">AI PRD</p>

              <p className="mt-2 font-medium">{prd ? "Generated" : "Pending"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PRD */}

      <Card>
        <CardHeader>
          <CardTitle>AI Product Requirement Document</CardTitle>

          <CardDescription>Generated from this feature request</CardDescription>
        </CardHeader>

        <CardContent>
          {prd ? (
            <div className="flex items-center justify-between rounded-lg border p-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Product Requirement Document Ready</h3>

                <p className="text-sm text-muted-foreground">
                  Review, edit and approve this PRD before development begins.
                </p>
              </div>

              <Button asChild>
                <Link href={`/dashboard/prds/${prd.id}`}>Review PRD</Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8">
              <div className="space-y-2">
                <h3 className="font-semibold">PRD Generation in Progress</h3>

                <p className="text-sm text-muted-foreground">
                  AI is currently generating the Product Requirement Document for this feature.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
