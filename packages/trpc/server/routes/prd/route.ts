import { TRPCError } from "@trpc/server";

import { db, eq, prds } from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import {
  approvePRDInput,
  approvePRDOutput,
  getPRDInput,
  getPRDOutput,
  updatePRDInput,
  updatePRDOutput,
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

  updatePRD: protectedProcedure
    .input(updatePRDInput)
    .output(updatePRDOutput)
    .mutation(async ({ ctx, input }) => {
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

          updatedAt: new Date(),
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
      const result = await db
        .update(prds)
        .set({
          status: "approved",

          approvedBy: ctx.user.id,

          approvedAt: new Date(),

          updatedAt: new Date(),
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
});
