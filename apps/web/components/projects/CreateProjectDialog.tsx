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

interface CreateProjectDialogProps {
  organizationId: string;
}

export function CreateProjectDialog({ organizationId }: CreateProjectDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  const createProject = trpc.project.createProject.useMutation({
    onSuccess(data) {
      setOpen(false);

      setName("");
      setSlug("");
      setDescription("");

      router.push(`/dashboard/projects/${data.id}`);
      router.refresh();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !slug.trim()) return;

    createProject.mutate({
      organizationId,
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      description: description || undefined,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!createProject.isPending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle>Create Project</DialogTitle>

          <DialogDescription>
            Create a new product inside your workspace. After creating it, connect a GitHub
            repository and start collecting feature requests.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Project Name
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="name"
              placeholder="LoopShip"
              value={name}
              onChange={(e) => {
                const value = e.target.value;

                setName(value);

                if (!slug) {
                  setSlug(
                    value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, ""),
                  );
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Project Slug
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="slug"
              placeholder="loopship"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            />

            <p className="text-xs text-muted-foreground">Used in project URLs.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              rows={6}
              placeholder="Describe what this project is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={createProject.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createProject.isPending || !name.trim() || !slug.trim()}
            >
              {createProject.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
