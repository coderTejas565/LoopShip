"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CreateOrganizationForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (!slugEdited) {
      setSlug(slugify(name));
    }
  }, [name, slugEdited]);

  const createOrganization = trpc.organization.createOrganization.useMutation({
    onSuccess() {
      router.push("/dashboard");
      router.refresh();
    },
    onError(error) {
      alert(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createOrganization.mutate({
      name,
      slug,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Workspace Name</Label>

        <Input
          id="name"
          placeholder="Acme Inc."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Workspace URL</Label>

        <Input
          id="slug"
          placeholder="acme-inc"
          value={slug}
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(slugify(e.target.value));
          }}
          required
        />

        <p className="text-xs text-muted-foreground">loopship.ai/{slug || "your-workspace"}</p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createOrganization.isPending || !name.trim() || !slug.trim()}
      >
        {createOrganization.isPending ? "Creating Workspace..." : "Create Workspace"}
      </Button>
    </form>
  );
}
