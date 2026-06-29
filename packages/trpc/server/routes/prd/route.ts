import { TRPCError } from "@trpc/server";

import { db, eq, prds, desc, featureRequests, projects } from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import {
  approvePRDInput,
  approvePRDOutput,
  getPRDInput,
  getPRDOutput,
  getPRDByFeatureRequestInput,
  getPRDByFeatureRequestOutput,
  updatePRDInput,
  updatePRDOutput,
  getRecentPRDsInput,
  getRecentPRDsOutput,
} from "./model";

export const prdRouter = router({
  getPRD: protectedProcedure
    .input(getPRDInput)
    .output(getPRDOutput)
    .query(async ({ input }) => {
      const result = await db.select().from(prds).where(eq(prds.id, input.prdId)).limit(1);

      const prd = result[0];

      if (!prd) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "PRD not found",
        });
      }

      return {
        id: prd.id,

        featureRequestId: prd.featureRequestId,

        version: prd.version,

        problemStatement: prd.problemStatement,

        goals: prd.goals as string[],

        nonGoals: prd.nonGoals as string[],

        userStories: prd.userStories as string[],

        acceptanceCriteria: prd.acceptanceCriteria as string[],

        edgeCases: prd.edgeCases as string[],

        successMetrics: prd.successMetrics as string[],

        status: prd.status,
      };
    }),
  getPRDByFeatureRequest: protectedProcedure
    .input(getPRDByFeatureRequestInput)
    .output(getPRDByFeatureRequestOutput)
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(prds)
        .where(eq(prds.featureRequestId, input.featureRequestId))
        .orderBy(desc(prds.version))
        .limit(1);

      const prd = result[0];

      if (!prd) {
        return null;
      }

      return {
        id: prd.id,

        featureRequestId: prd.featureRequestId,

        version: prd.version,

        problemStatement: prd.problemStatement,

        goals: prd.goals as string[],

        nonGoals: prd.nonGoals as string[],

        userStories: prd.userStories as string[],

        acceptanceCriteria: prd.acceptanceCriteria as string[],

        edgeCases: prd.edgeCases as string[],

        successMetrics: prd.successMetrics as string[],

        status: prd.status,
      };
    }),

  updatePRD: protectedProcedure
    .input(updatePRDInput)
    .output(updatePRDOutput)
    .mutation(async ({ ctx, input }) => {
      const now = new Date();

      const result = await db
        .update(prds)
        .set({
          problemStatement: input.problemStatement,

          goals: input.goals,

          nonGoals: input.nonGoals,

          userStories: input.userStories,

          acceptanceCriteria: input.acceptanceCriteria,

          edgeCases: input.edgeCases,

          successMetrics: input.successMetrics,

          lastEditedBy: ctx.user.id,

          updatedAt: now,
        })
        .where(eq(prds.id, input.prdId))
        .returning({
          id: prds.id,
        });

      if (!result.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "PRD not found",
        });
      }

      return {
        success: true,
      };
    }),

  approvePRD: protectedProcedure
    .input(approvePRDInput)
    .output(approvePRDOutput)
    .mutation(async ({ ctx, input }) => {
      const now = new Date();

      const result = await db
        .update(prds)
        .set({
          status: "approved",

          approvedBy: ctx.user.id,

          approvedAt: now,

          updatedAt: now,
        })
        .where(eq(prds.id, input.prdId))
        .returning({
          id: prds.id,
        });

      if (!result.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "PRD not found",
        });
      }

      return {
        success: true,
      };
    }),
  getRecentPRDs: protectedProcedure
    .input(getRecentPRDsInput)
    .output(getRecentPRDsOutput)
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: prds.id,

          version: prds.version,

          status: prds.status,

          featureRequest: {
            title: featureRequests.title,
          },
        })
        .from(prds)

        .innerJoin(featureRequests, eq(prds.featureRequestId, featureRequests.id))

        .innerJoin(projects, eq(featureRequests.projectId, projects.id))

        .where(eq(projects.organizationId, input.organizationId))

        .orderBy(desc(prds.createdAt))

        .limit(input.limit ?? 5);

      return result;
    }),
});
