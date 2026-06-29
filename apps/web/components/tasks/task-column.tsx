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

import { Droppable } from "@hello-pangea/dnd";

type TaskColumnProps = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  isLoading: boolean;
};



export function TaskColumn({
  title,
  status,
  tasks,
  isLoading
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


      <CardContent>
  <Droppable droppableId={status}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`
          min-h-[350px]
          space-y-3
          rounded-lg
          transition-colors
          ${
            snapshot.isDraggingOver
              ? "bg-primary/5"
              : ""
          }
        `}
      >
        {tasks.length === 0 ? (
          <div
            className="
              flex
              min-h-[120px]
              items-center
              justify-center
              rounded-lg
              border
              border-dashed
              text-sm
              text-muted-foreground
            "
          >
            Drop tasks here
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              isLoading={isLoading}
            />
          ))
        )}

        {provided.placeholder}

        <Button
          variant="ghost"
          disabled={isLoading}
          className="
            mt-2
            w-full
            justify-start
            text-muted-foreground
          "
        >
          <Plus className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </div>
    )}
  </Droppable>
</CardContent>
    </Card>
  );
}