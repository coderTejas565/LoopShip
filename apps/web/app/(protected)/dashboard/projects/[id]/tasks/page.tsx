import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@repo/auth";

import { api } from "~/trpc/server";

import { Button } from "~/components/ui/button";

import { PageHeader } from "~/components/layout/page-header";

import { CreateTaskDialog } from "~/components/tasks/create-task-dialog";
import { TaskBoard } from "~/components/tasks/task-board";

import { ArrowLeft, ListTodo } from "lucide-react";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function TasksPage({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const caller = api();

  const project = await caller.project.getProject.query({
    projectId: params.projectId,
  });

  const tasks = await caller.task.getTasks.query({
    projectId: params.projectId,
  });

  return (
    <div className="space-y-10">
      <PageHeader
        title="Tasks"
        description="Break PRDs into actionable engineering work and track delivery progress."
        backHref={`/dashboard/projects/${params.projectId}`}
        backLabel="Project"
        actions={<CreateTaskDialog projectId={params.projectId} />}
      />

      <div className="flex items-center gap-3 rounded-xl border bg-card p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ListTodo className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="font-medium">{project.name}</p>

          <p className="text-sm text-muted-foreground">{tasks.length} tasks in this project</p>
        </div>

        <Button asChild variant="ghost" className="ml-auto">
          <Link href={`/dashboard/projects/${params.projectId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Project
          </Link>
        </Button>
      </div>

      <TaskBoard tasks={tasks} />
    </div>
  );
}
