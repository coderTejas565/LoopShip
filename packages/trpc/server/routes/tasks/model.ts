import { z } from "zod";


export const getTasksInput = z.object({
  projectId: z.string(),
});


export const getTasksOutput = z.array(
  z.object({
    id: z.string(),

    title: z.string(),

    description: z.string().nullable(),

    status: z.enum([
      "backlog",
      "in_progress",
      "review",
      "done",
    ]),

    priority: z.enum([
      "low",
      "medium",
      "high",
      "critical",
    ]),

    assignedTo: z.string().nullable(),

    featureRequest: z
      .object({
        id: z.string(),
        title: z.string(),
      })
      .nullable(),

    prd: z
      .object({
        id: z.string(),
        version: z.number(),
      })
      .nullable(),
  }),
);



export const createTaskInput = z.object({
  projectId: z.string(),

  featureRequestId: z.string().optional(),

  prdId: z.string().optional(),


  title: z.string().min(1),

  description: z.string().optional(),


  priority: z
    .enum([
      "low",
      "medium",
      "high",
      "critical",
    ])
    .default("medium"),
});


export const createTaskOutput = z.object({
  id: z.string(),
});



export const updateTaskStatusInput = z.object({
  taskId: z.string(),

  status: z.enum([
    "backlog",
    "in_progress",
    "review",
    "done",
  ]),
});


export const updateTaskStatusOutput = z.object({
  success: z.boolean(),
});