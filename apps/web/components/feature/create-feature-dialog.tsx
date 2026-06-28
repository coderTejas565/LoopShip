"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type CreateFeatureDialogProps = {
  projectId: string;
};

export function CreateFeatureDialog({
  projectId,
}: CreateFeatureDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [source, setSource] = useState<
    "manual" | "email" | "support_ticket" | "call"
  >("manual");

  const createFeature =
    trpc.featureRequest.createFeatureRequest.useMutation({
      onSuccess() {
        setOpen(false);

        setTitle("");

        setDescription("");

        setSource("manual");

        router.refresh();
      },
    });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    createFeature.mutate({
      projectId,
      title,
      description,
      source,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!createFeature.isPending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Feature
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle>
            Create Feature Request
          </DialogTitle>

          <DialogDescription>
            Add a customer request or product idea.
            LoopShip will later generate an AI-powered
            Product Requirement Document from it.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">
              Title
              <span className="text-destructive">
                {" "}
                *
              </span>
            </Label>

            <Input
              id="title"
              placeholder="AI-generated code review for pull requests"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              rows={7}
              placeholder="Describe the problem, customer pain points, expected outcome, or any additional context..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Request Source
            </Label>

            <Select
              value={source}
              onValueChange={(value) =>
                setSource(
                  value as
                    | "manual"
                    | "email"
                    | "support_ticket"
                    | "call"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="manual">
                  Manual
                </SelectItem>

                <SelectItem value="email">
                  Email
                </SelectItem>

                <SelectItem value="support_ticket">
                  Support Ticket
                </SelectItem>

                <SelectItem value="call">
                  Call
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={createFeature.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createFeature.isPending ||
                !title.trim()
              }
            >
              {createFeature.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {createFeature.isPending
                ? "Creating..."
                : "Create Feature"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}