import Link from "next/link";

import { ArrowRight, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";

type DashboardHeaderProps = {
  name: string;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {getGreeting()}, {name} 👋
        </h1>

        <p className="text-muted-foreground">Continue where you left off.</p>
      </div>

      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard/projects">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button asChild>
          <Link href="/dashboard/projects">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
    </section>
  );
}
