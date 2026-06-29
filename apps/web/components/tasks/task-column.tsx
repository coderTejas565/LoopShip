"use client";

import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { TaskCard } from "./task-card";

import type { Task } from "./task-board";



type TaskColumnProps = {
  title: string;

  status: Task["status"];

  tasks: Task[];
};



export function TaskColumn({
  title,
  status,
  tasks,
}: TaskColumnProps) {
  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {title}
          </CardTitle>

          <span
            className="
            rounded-full
            bg-background
            px-2
            py-1
            text-xs
            text-muted-foreground
            "
          >
            {tasks.length}
          </span>
        </div>
      </CardHeader>


      <CardContent className="space-y-3">

        {tasks.length === 0 ? (
          <div
            className="
            rounded-lg
            border
            border-dashed
            p-6
            text-center
            text-sm
            text-muted-foreground
            "
          >
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        )}


        <Button
          variant="ghost"
          className="
          w-full
          justify-start
          text-muted-foreground
          "
        >
          <Plus className="mr-2 h-4 w-4" />

          Add task
        </Button>

      </CardContent>
    </Card>
  );
}