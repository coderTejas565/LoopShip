import { TRPCError } from "@trpc/server";

import {
  db,
  eq,
  desc,
  organizations,
  memberships,
  projects,
  featureRequests,
} from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import { inngest, events } from "@repo/inngest";

import {
  createFeatureRequestInput,
  createFeatureRequestOutput,
  getFeatureRequestInput,
  getFeatureRequestOutput,
  getFeatureRequestsInput,
  getFeatureRequestsOutput,
  getRecentFeatureRequestsInput,
  getRecentFeatureRequestsOutput,
} from "./model";

export const featureRequestRouter = router({
  createFeatureRequest: protectedProcedure
    .input(createFeatureRequestInput)
    .output(createFeatureRequestOutput)
    .mutation(async ({ ctx, input }) => {
      const project = await db
        .select({
          id: projects.id,
        })
        .from(projects)
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .innerJoin(memberships, eq(memberships.organizationId, organizations.id))
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const result = await db
        .insert(featureRequests)
        .values({
          projectId: input.projectId,

          title: input.title,

          description: input.description,

          source: input.source,

          requestedBy: ctx.user.id,
        })
        .returning({
          id: featureRequests.id,
        });

      const feature = result[0];

      if (!feature) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create feature request",
        });
      }

      await inngest.send({
        name: events.featureRequestCreated,
        data: {
          featureRequestId: feature.id,
        },
      });

      return {
        id: feature.id,
      };
    }),

  getFeatureRequests: protectedProcedure
    .input(getFeatureRequestsInput)
    .output(getFeatureRequestsOutput)
    .query(async ({ ctx, input }) => {
      const results = await db
        .select({
          id: featureRequests.id,

          title: featureRequests.title,

          source: featureRequests.source,

          status: featureRequests.status,
        })
        .from(featureRequests)
        .where(eq(featureRequests.projectId, input.projectId));

      return results;
    }),

  getFeatureRequest: protectedProcedure
    .input(getFeatureRequestInput)
    .output(getFeatureRequestOutput)
    .query(async ({ ctx, input }) => {
      const result = await db
        .select()
        .from(featureRequests)
        .where(eq(featureRequests.id, input.featureRequestId))
        .limit(1);

      const feature = result[0];

      if (!feature) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Feature request not found",
        });
      }

      return {
        id: feature.id,

        projectId: feature.projectId,

        title: feature.title,

        description: feature.description,

        source: feature.source,

        status: feature.status,
      };
    }),
  getRecentFeatureRequests: protectedProcedure
    .input(getRecentFeatureRequestsInput)
    .output(getRecentFeatureRequestsOutput)
    .query(async ({ input }) => {
      const results = await db
        .select({
          id: featureRequests.id,

          title: featureRequests.title,

          source: featureRequests.source,

          status: featureRequests.status,

          project: {
            id: projects.id,

            name: projects.name,
          },
        })
        .from(featureRequests)
        .innerJoin(projects, eq(featureRequests.projectId, projects.id))
        .where(eq(projects.organizationId, input.organizationId))
        .orderBy(desc(featureRequests.createdAt))
        .limit(input.limit);

      return results;
    }),
});
