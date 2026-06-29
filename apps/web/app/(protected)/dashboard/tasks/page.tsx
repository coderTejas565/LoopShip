import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth";

import { api } from "~/trpc/server";

import { PageHeader } from "~/components/layout/page-header";

import { TaskBoard } from "~/components/tasks/task-board";
import { CreateTaskDialog } from "~/components/tasks/create-task-dialog";

import { ListTodo } from "lucide-react";

export default async function TasksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const caller = api();

  const organization = await caller.organization.getCurrentOrganization.query();

  const tasks = await caller.task.getOrganizationTasks.query({
    organizationId: organization.id,
  });

  return (
    <div className="space-y-10">
      <PageHeader
        title="Tasks"
        description="Plan, track and ship features through your engineering workflow."
        actions={<CreateTaskDialog projectId={tasks[0]?.project.id ?? ""} />}
      />

      <div className="flex items-center gap-3 rounded-xl border bg-card p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ListTodo className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="font-medium">Engineering Board</p>

          <p className="text-sm text-muted-foreground">
            {tasks.length} active tasks across projects
          </p>
        </div>
      </div>

      <TaskBoard tasks={tasks}/>
    </div>
  );
}
