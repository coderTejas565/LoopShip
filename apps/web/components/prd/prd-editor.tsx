"use client";

import { Loader2, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { trpc } from "~/trpc/client";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import { ArrayEditor } from "./array-editor";
import { prdEditorSchema, type PRDEditorValues } from "./prd-editor-schema";

type Props = {
  prd: {
    id: string;
    problemStatement: string;
    goals: string[];
    nonGoals: string[];
    userStories: string[];
    acceptanceCriteria: string[];
    edgeCases: string[];
    successMetrics: string[];
  };

  onCancel: () => void;
};

export function PRDEditor({ prd, onCancel }: Props) {
  const router = useRouter();

  const form = useForm<PRDEditorValues>({
    defaultValues: {
      problemStatement: prd.problemStatement,
      goals: prd.goals,
      nonGoals: prd.nonGoals,
      userStories: prd.userStories,
      acceptanceCriteria: prd.acceptanceCriteria,
      edgeCases: prd.edgeCases,
      successMetrics: prd.successMetrics,
    },
  });

  const update = trpc.prd.updatePRD.useMutation({
    onSuccess() {
      router.refresh();
      onCancel();
    },
  });

  const values = form.watch();

  function submit(data: PRDEditorValues) {
    update.mutate({
      prdId: prd.id,
      ...data,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="mx-auto max-w-6xl space-y-8 pb-32">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <PencilLine className="h-6 w-6 text-primary" />

            <h1 className="text-3xl font-bold">Edit Product Requirement</h1>

            <Badge variant="secondary">Editing</Badge>
          </div>

          <p className="text-muted-foreground">
            Update the generated PRD before approving it for development.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {/* Problem Statement */}

      <Card>
        <CardHeader>
          <CardTitle>Problem Statement</CardTitle>

          <CardDescription>Clearly describe the problem this feature is solving.</CardDescription>
        </CardHeader>

        <CardContent>
          <Label className="sr-only">Problem Statement</Label>

          <Textarea rows={8} className="resize-none" {...form.register("problemStatement")} />
        </CardContent>
      </Card>

      <ArrayEditor
        title="Goals"
        value={values.goals}
        onChange={(items) => form.setValue("goals", items)}
      />

      <ArrayEditor
        title="Non Goals"
        value={values.nonGoals}
        onChange={(items) => form.setValue("nonGoals", items)}
      />

      <ArrayEditor
        title="User Stories"
        value={values.userStories}
        onChange={(items) => form.setValue("userStories", items)}
      />

      <ArrayEditor
        title="Acceptance Criteria"
        value={values.acceptanceCriteria}
        onChange={(items) => form.setValue("acceptanceCriteria", items)}
      />

      <ArrayEditor
        title="Edge Cases"
        value={values.edgeCases}
        onChange={(items) => form.setValue("edgeCases", items)}
      />

      <ArrayEditor
        title="Success Metrics"
        value={values.successMetrics}
        onChange={(items) => form.setValue("successMetrics", items)}
      />

      {/* Sticky Footer */}

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-end gap-3 p-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" disabled={update.isPending}>
            {update.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {update.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
