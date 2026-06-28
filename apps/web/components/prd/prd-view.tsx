"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowLeft, FileText, Target, Users, CheckCircle2, ShieldAlert } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { PRDActions } from "./prd-actions";
import { PRDEditor } from "./prd-editor";

type PRDViewProps = {
  prd: {
    id: string;
    featureRequestId: string;
    problemStatement: string;
    goals: string[];
    nonGoals: string[];
    userStories: string[];
    acceptanceCriteria: string[];
    edgeCases: string[];
    successMetrics: string[];
    status: string;
    version: number;
  };
};

export function PRDView({ prd }: PRDViewProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <PRDEditor prd={prd} onCancel={() => setEditing(false)} />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      <div className="space-y-5">
        <Link
          href={`/dashboard/features/${prd.featureRequestId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Feature
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">Product Requirement Document</h1>

            <p className="text-muted-foreground">
              AI-generated implementation specification for engineering.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Version {prd.version}</Badge>

              <Badge variant={prd.status === "approved" ? "default" : "outline"}>
                {prd.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            {prd.status !== "approved" && (
              <Button variant="outline" onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}

            <PRDActions prdId={prd.id} status={prd.status} />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Problem Statement
          </CardTitle>

          <CardDescription>Why this feature should be built.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="leading-8 whitespace-pre-wrap text-muted-foreground">
            {prd.problemStatement}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <ContentSection
          icon={Target}
          title="Requirements"
          firstTitle="Goals"
          firstItems={prd.goals}
          secondTitle="Non Goals"
          secondItems={prd.nonGoals}
        />

        <ContentSection
          icon={Users}
          title="Development"
          firstTitle="User Stories"
          firstItems={prd.userStories}
          secondTitle="Acceptance Criteria"
          secondItems={prd.acceptanceCriteria}
        />

        <ContentSection
          icon={ShieldAlert}
          title="Validation"
          firstTitle="Edge Cases"
          firstItems={prd.edgeCases}
          secondTitle="Success Metrics"
          secondItems={prd.successMetrics}
        />
      </div>
    </div>
  );
}

function ContentSection({
  icon: Icon,
  title,
  firstTitle,
  firstItems,
  secondTitle,
  secondItems,
}: {
  icon: React.ElementType;
  title: string;
  firstTitle: string;
  firstItems: string[];
  secondTitle: string;
  secondItems: string[];
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <ItemGroup title={firstTitle} items={firstItems} />

        <ItemGroup title={secondTitle} items={secondItems} />
      </CardContent>
    </Card>
  );
}

function ItemGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{title}</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border bg-muted/30 p-4 text-sm leading-7 text-muted-foreground"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
