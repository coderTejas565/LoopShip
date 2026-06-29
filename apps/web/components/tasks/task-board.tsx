"use client";

import { KanbanSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { TaskColumn } from "./task-column";

export type Task = {
  id: string;

  title: string;

  description: string | null;

  status:
    | "backlog"
    | "in_progress"
    | "review"
    | "done";

  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";


  project?: {
    id: string;
    name: string;
  };


  assignedTo:
    | string
    | {
        id: string;
        name: string;
        email: string;
      }
    | null;


  featureRequest: {
    id: string;
    title: string;
  } | null;


  prd:
    | {
        id: string;
        version?: number;
        status?: string;
      }
    | null;
};

type TaskBoardProps = {
  tasks: Task[];
};

const columns = [
  {
    id: "backlog",
    title: "Backlog",
  },

  {
    id: "in_progress",
    title: "In Progress",
  },

  {
    id: "review",
    title: "Review",
  },

  {
    id: "done",
    title: "Done",
  },
] as const;

export function TaskBoard({ tasks }: TaskBoardProps) {
  function getTasksByStatus(status: Task["status"]) {
    return tasks.filter((task) => task.status === status);
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <KanbanSquare className="h-5 w-5 text-primary" />
          </div>

          <div>
            <CardTitle>Engineering Board</CardTitle>

            <p className="text-sm text-muted-foreground">
              Track implementation progress from PRD to release.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="
          grid
          gap-5
          lg:grid-cols-4
        "
        >
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              status={column.id}
              tasks={getTasksByStatus(column.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
