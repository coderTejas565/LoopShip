import { TRPCError } from "@trpc/server";

import { eq, and, desc, projects, memberships } from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import {
  connectRepositoryInput,
  connectRepositoryOutput,
  createProjectInput,
  createProjectOutput,
  getProjectInput,
  getProjectOutput,
  getProjectsInput,
  getProjectsOutput,
} from "./model";

export const projectRouter = router({
  createProject: protectedProcedure
    .input(createProjectInput)
    .output(createProjectOutput)
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db
        .select()
        .from(memberships)
        .where(
          and(
            eq(memberships.organizationId, input.organizationId),
            eq(memberships.userId, ctx.user.id),
          ),
        )
        .limit(1);

      if (membership.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not a member of organization",
        });
      }

      const existingProject = await ctx.db
        .select({
          id: projects.id,
        })
        .from(projects)
        .where(
          and(eq(projects.organizationId, input.organizationId), eq(projects.slug, input.slug)),
        )
        .limit(1);

      if (existingProject.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Project slug already exists",
        });
      }

      const result = await ctx.db
        .insert(projects)
        .values({
          organizationId: input.organizationId,

          name: input.name.trim(),

          slug: input.slug.trim().toLowerCase(),

          description: input.description,

          createdBy: ctx.user.id,
        })
        .returning({
          id: projects.id,
        });

      const project = result[0];

      if (!project) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }

      return {
        id: project.id,
      };
    }),

  getProject: protectedProcedure
    .input(getProjectInput)
    .output(getProjectOutput)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      const project = result[0];

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return {
        id: project.id,
        organizationId: project.organizationId,

        name: project.name,
        slug: project.slug,
        description: project.description,

        status: project.status,

        githubRepository: project.githubRepository,

        githubRepositoryOwner: project.githubRepositoryOwner,

        githubRepositoryName: project.githubRepositoryName,

        defaultBranch: project.defaultBranch,
      };
    }),

  getProjects: protectedProcedure
    .input(getProjectsInput)
    .output(getProjectsOutput)
    .query(async ({ ctx, input }) => {
      const member = await ctx.db
        .select()
        .from(memberships)
        .where(
          and(
            eq(memberships.organizationId, input.organizationId),
            eq(memberships.userId, ctx.user.id),
          ),
        )
        .limit(1);

      if (member.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Access denied",
        });
      }

      return await ctx.db
        .select({
          id: projects.id,
          name: projects.name,
          slug: projects.slug,
          description: projects.description,
          status: projects.status,
        })
        .from(projects)
        .where(eq(projects.organizationId, input.organizationId))
        .orderBy(desc(projects.createdAt));
    }),
  connectRepository: protectedProcedure
    .input(connectRepositoryInput)
    .output(connectRepositoryOutput)
    .mutation(async ({ ctx, input }) => {
      const projectResult = await ctx.db
        .select({
          id: projects.id,
          organizationId: projects.organizationId,
        })
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      const project = projectResult[0];

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const membership = await ctx.db
        .select({
          id: memberships.id,
        })
        .from(memberships)
        .where(
          and(
            eq(memberships.organizationId, project.organizationId),
            eq(memberships.userId, ctx.user.id),
          ),
        )
        .limit(1);

      if (membership.length === 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Access denied",
        });
      }

      await ctx.db
        .update(projects)
        .set({
          githubRepositoryId: String(input.repositoryId),

          githubRepositoryOwner: input.owner,

          githubRepositoryName: input.name,

          githubRepository: input.fullName,

          defaultBranch: input.defaultBranch,

          githubConnectedAt: new Date(),

          githubWebhookActive: false,

          updatedAt: new Date(),
        })
        .where(eq(projects.id, input.projectId));

      return {
        success: true,
      };
    }),
});
