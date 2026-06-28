import Link from "next/link";

import { api } from "~/trpc/server";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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

  const feature =
    await caller.featureRequest.getFeatureRequest.query({
      featureRequestId: id,
    });

  const prd =
    await caller.prd.getPRDByFeatureRequest.query({
      featureRequestId: id,
    });

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Link
            href="/dashboard/projects"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Projects
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            {feature.title}
          </h1>

          <div className="flex gap-2">
            <Badge>
              {feature.status}
            </Badge>

            <Badge variant="secondary">
              {feature.source}
            </Badge>
          </div>
        </div>

        {prd && (
          <Button asChild>
            <Link href={`/dashboard/prds/${prd.id}`}>
              Open PRD
            </Link>
          </Button>
        )}
      </div>

      <Separator />

      {/* Overview */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Feature Description
            </CardTitle>

            <CardDescription>
              Original feature request submitted by the user.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Status
              </p>

              <Badge className="mt-2">
                {feature.status}
              </Badge>
            </div>

            <Separator />

            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Source
              </p>

              <p className="mt-2 font-medium capitalize">
                {feature.source}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-xs uppercase text-muted-foreground">
                AI PRD
              </p>

              <p className="mt-2 font-medium">
                {prd ? "Generated" : "Pending"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PRD */}

      <Card>
        <CardHeader>
          <CardTitle>
            Product Requirement Document
          </CardTitle>

          <CardDescription>
            AI-generated specification for engineering.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {prd ? (
            <div className="flex flex-col gap-6 rounded-lg border bg-muted/30 p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    ✅
                  </span>

                  <h3 className="font-semibold text-lg">
                    PRD Ready
                  </h3>
                </div>

                <p className="text-muted-foreground">
                  The AI has generated a structured Product
                  Requirement Document. Review, edit and approve it
                  before development begins.
                </p>
              </div>

              <Button asChild size="lg">
                <Link href={`/dashboard/prds/${prd.id}`}>
                  Review PRD
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-10 text-center">
              <div className="space-y-3">
                <div className="text-5xl">
                  🤖
                </div>

                <h3 className="text-lg font-semibold">
                  PRD is being generated
                </h3>

                <p className="mx-auto max-w-xl text-muted-foreground">
                  Inngest is currently processing this feature request
                  and generating the Product Requirement Document.
                  Refresh this page in a few moments.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}