"use client";

import { KanbanSquare } from "lucide-react";
import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";

import { trpc } from "~/trpc/client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { useEffect, useState } from "react";

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

export function TaskBoard({
  tasks,
}: TaskBoardProps) {

const [localTasks, setLocalTasks] = useState(() => tasks);

    useEffect(() => {
  setLocalTasks(tasks);
}, [tasks]);

  const utils = trpc.useUtils();

  const updateTaskStatus =
    trpc.task.updateTaskStatus.useMutation({
      onSuccess: async () => {
        await Promise.all([
          utils.task.getTasks.invalidate(),
          utils.task.getOrganizationTasks.invalidate(),
        ]);
      },
    });

function onDragEnd(result: DropResult) {
if (updateTaskStatus.isPending) return;

  if (!result.destination) return;

  if (
    result.source.droppableId ===
    result.destination.droppableId
  ) {
    return;
  }

  const newStatus =
    result.destination.droppableId as Task["status"];

  // Save current state in case we need to rollback
const previousTasks = [...localTasks];

  // Optimistically update UI
  setLocalTasks((current) =>
    current.map((task) =>
      task.id === result.draggableId
        ? {
            ...task,
            status: newStatus,
          }
        : task,
    ),
  );

  updateTaskStatus.mutate(
    {
      taskId: result.draggableId,
      status: newStatus,
    },
    {
      onError() {
        // Rollback if request fails
        setLocalTasks(previousTasks);
      },
    },
  );
}

function getTasksByStatus(status: Task["status"]) {
  return localTasks.filter(
    (task) => task.status === status,
  );
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <KanbanSquare className="h-5 w-5 text-primary" />
            </div>

            <div>
              <CardTitle>
                Engineering Board
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Track implementation progress
                from PRD to release.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 lg:grid-cols-4">
            {columns.map((column) => (
           <TaskColumn
  key={column.id}
  title={column.title}
  status={column.id}
  tasks={getTasksByStatus(column.id)}
  isLoading={updateTaskStatus.isPending}
/>
            ))}
          </div>
        </CardContent>
      </Card>
    </DragDropContext>
  );
}