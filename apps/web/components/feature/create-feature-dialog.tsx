"use client";

import { useState } from "react";
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

  function handleSubmit() {
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
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          New Feature
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Create Feature Request
          </DialogTitle>

          <DialogDescription>
            Capture a new customer request or product idea.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>
              Title
            </Label>

            <Input
              placeholder="AI generated code review"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Description
            </Label>

            <Textarea
              rows={6}
              placeholder="Describe the feature request..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Source
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

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={
                createFeature.isPending ||
                !title.trim()
              }
            >
              {createFeature.isPending
                ? "Creating..."
                : "Create Feature"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}