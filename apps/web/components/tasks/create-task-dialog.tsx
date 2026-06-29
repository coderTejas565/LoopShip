"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

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

type Props = {
  projectId: string;

  featureRequestId?: string;

  prdId?: string;
};

export function CreateTaskDialog({ projectId, featureRequestId, prdId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium");

  const createTask = trpc.task.createTask.useMutation({
    onSuccess() {
      setOpen(false);

      setTitle("");

      setDescription("");

      setPriority("medium");

      router.refresh();
    },
  });

  function submit() {
    if (!title.trim()) return;

    createTask.mutate({
      projectId,

      title,

      description,

      priority,

      featureRequestId,

      prdId,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>

          <DialogDescription>Break the PRD into an actionable engineering task.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Task title</Label>

            <Input
              placeholder="Implement authentication flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={5}
              placeholder="Explain what needs to be built..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>

            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>

                <SelectItem value="medium">Medium</SelectItem>

                <SelectItem value="high">High</SelectItem>

                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button onClick={submit} disabled={createTask.isPending || !title.trim()}>
              {createTask.isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
