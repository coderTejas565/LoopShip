import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Rocket,
  CheckCircle2,
  FolderKanban,
  Sparkles,
  GitBranch,
  LayoutDashboard,
} from "lucide-react";

import { auth } from "@repo/auth";

import { api } from "~/trpc/server";

import { CreateOrganizationForm } from "~/components/onboarding/create-organization-form";

export default async function CreateOrganizationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const caller = api();

  const organization = await caller.organization.getCurrentOrganization.query();

  if (organization) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-muted/30">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border bg-background shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left */}

          <div className="relative hidden overflow-hidden border-r bg-muted/40 p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Rocket className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to
                <br />
                LoopShip
              </h1>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Your AI-powered operating system for shipping software from feature request to
                production.
              </p>
            </div>

            <div className="space-y-5">
              <Feature icon={<FolderKanban />} text="Manage projects across your organization" />

              <Feature icon={<Sparkles />} text="Generate AI-powered PRDs in seconds" />

              <Feature
                icon={<LayoutDashboard />}
                text="Track engineering work with Kanban boards"
              />

              <Feature
                icon={<GitBranch />}
                text="Connect GitHub repositories & review PRs with AI"
              />
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col justify-center p-10 sm:p-14">
            <div className="mb-10">
              <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium">
                Workspace Setup
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight">Create your workspace</h2>

              <p className="mt-3 text-muted-foreground">
                Every project, repository, feature request, PRD, and task belongs to a workspace.
              </p>
            </div>

            <CreateOrganizationForm />

            <p className="mt-8 text-center text-sm text-muted-foreground">
              You can invite teammates and create additional workspaces later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
