import { eq, desc } from "@repo/database";

import { db, tasks, featureRequests, prds, projects, user } from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import {
  getTasksInput,
  getTasksOutput,
  createTaskInput,
  createTaskOutput,
  updateTaskStatusInput,
  updateTaskStatusOutput,
  getOrganizationTasksInput,
  getOrganizationTasksOutput,
} from "./model";

export const taskRouter = router({
  getTasks: protectedProcedure
    .input(getTasksInput)
    .output(getTasksOutput)
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: tasks.id,

          title: tasks.title,

          description: tasks.description,

          status: tasks.status,

          priority: tasks.priority,

          assignedTo: tasks.assignedTo,

          featureRequest: {
            id: featureRequests.id,
            title: featureRequests.title,
          },

          prd: {
            id: prds.id,
            version: prds.version,
          },
        })
        .from(tasks)

        .leftJoin(featureRequests, eq(tasks.featureRequestId, featureRequests.id))

        .leftJoin(prds, eq(tasks.prdId, prds.id))

        .where(eq(tasks.projectId, input.projectId))

        .orderBy(desc(tasks.createdAt));

      return result;
    }),

  createTask: protectedProcedure
    .input(createTaskInput)
    .output(createTaskOutput)
    .mutation(async ({ input }) => {
      const result = await db
        .insert(tasks)
        .values({
          projectId: input.projectId,

          featureRequestId: input.featureRequestId,

          prdId: input.prdId,

          title: input.title,

          description: input.description,

          priority: input.priority,
        })
        .returning({
          id: tasks.id,
        });

      return {
        id: result[0]!.id,
      };
    }),

  updateTaskStatus: protectedProcedure
    .input(updateTaskStatusInput)
    .output(updateTaskStatusOutput)
    .mutation(async ({ input }) => {
      await db
        .update(tasks)
        .set({
          status: input.status,

          updatedAt: new Date(),
        })
        .where(eq(tasks.id, input.taskId));

      return {
        success: true,
      };
    }),

  getOrganizationTasks: protectedProcedure
    .input(getOrganizationTasksInput)
    .output(getOrganizationTasksOutput)
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: tasks.id,

          title: tasks.title,

          description: tasks.description,

          status: tasks.status,

          priority: tasks.priority,

          project: {
            id: projects.id,
            name: projects.name,
          },

          assignedTo: {
            id: user.id,
            name: user.name,
            email: user.email,
          },

          featureRequest: {
            id: featureRequests.id,
            title: featureRequests.title,
          },

          prd: {
            id: prds.id,
            status: prds.status,
          },
        })
        .from(tasks)

        .innerJoin(projects, eq(tasks.projectId, projects.id))

        .leftJoin(user, eq(tasks.assignedTo, user.id))

        .leftJoin(featureRequests, eq(tasks.featureRequestId, featureRequests.id))

        .leftJoin(prds, eq(tasks.prdId, prds.id))

        .where(eq(projects.organizationId, input.organizationId));

      return result;
    }),
});
