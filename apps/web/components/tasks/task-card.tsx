"use client";

import Link from "next/link";

import {
  FileText,
  MessageSquare,
  User,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";

import {
  Card,
  CardContent,
} from "~/components/ui/card";

import type { Task } from "./task-board";


type TaskCardProps = {
  task: Task;
};

function priorityVariant(priority: Task["priority"]) {
  if (priority === "critical") {
    return "destructive";
  }

  if (priority === "high") {
    return "secondary";
  }

  return "outline";
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      className="
        group
        cursor-pointer
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <CardContent className="space-y-4 p-4">
        {/* Header */}

        <div className="space-y-2">
          <h3
            className="
            font-medium
            leading-tight
            group-hover:text-primary
          "
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="
              line-clamp-2
              text-sm
              text-muted-foreground
            "
            >
              {task.description}
            </p>
          )}
        </div>

        {/* Priority */}

        <div className="flex items-center justify-between">
          <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>

          {task.assignedTo && (
            <User
              className="
                h-4
                w-4
                text-muted-foreground
              "
            />
          )}
        </div>

        {/* Relations */}

        <div className="space-y-2">
          {task.featureRequest && (
            <Link
              href={`/dashboard/features/${task.featureRequest.id}`}
              className="
                flex
                items-center
                gap-2
                text-xs
                text-muted-foreground
                hover:text-primary
              "
            >
              <MessageSquare className="h-3.5 w-3.5" />

              {task.featureRequest.title}
            </Link>
          )}

          {task.prd && (
            <Link
              href={`/dashboard/prds/${task.prd.id}`}
              className="
                flex
                items-center
                gap-2
                text-xs
                text-muted-foreground
                hover:text-primary
              "
            >
              <FileText className="h-3.5 w-3.5" />
              PRD {task.prd.version ? `v${task.prd.version}` : ""}
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
