import { TRPCError } from "@trpc/server";

import {
  db,
  eq,
  organizations,
  memberships,
  projects,
  featureRequests,
} from "@repo/database";

import {
  protectedProcedure,
  router,
} from "../../trpc";

import { generatePRD } from "@repo/ai";

import { prds } from "@repo/database";

import {
  createFeatureRequestInput,
  createFeatureRequestOutput,
  getFeatureRequestInput,
  getFeatureRequestOutput,
  getFeatureRequestsInput,
  getFeatureRequestsOutput,
  generatePRDInput,
  generatePRDOutput
} from "./model";

export const featureRequestRouter =
  router({
    createFeatureRequest:
      protectedProcedure
        .input(
          createFeatureRequestInput,
        )
        .output(
          createFeatureRequestOutput,
        )
        .mutation(
          async ({ ctx, input }) => {
            const project =
              await db
                .select({
                  id: projects.id,
                })
                .from(projects)
                .innerJoin(
                  organizations,
                  eq(
                    projects.organizationId,
                    organizations.id,
                  ),
                )
                .innerJoin(
                  memberships,
                  eq(
                    memberships.organizationId,
                    organizations.id,
                  ),
                )
                .where(
                  eq(
                    projects.id,
                    input.projectId,
                  ),
                )
                .limit(1);

            if (
              !project.length
            ) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message:
                  "Project not found",
              });
            }

            const result =
              await db
                .insert(
                  featureRequests,
                )
                .values({
                  projectId:
                    input.projectId,

                  title:
                    input.title,

                  description:
                    input.description,

                  source:
                    input.source,

                  requestedBy:
                    ctx.user.id,
                })
                .returning({
                  id:
                    featureRequests.id,
                });

            const feature =
              result[0];

            if (!feature) {
              throw new TRPCError({
                code:
                  "INTERNAL_SERVER_ERROR",
                message:
                  "Failed to create feature request",
              });
            }

            return {
              id: feature.id,
            };
          },
        ),

    getFeatureRequests:
      protectedProcedure
        .input(
          getFeatureRequestsInput,
        )
        .output(
          getFeatureRequestsOutput,
        )
        .query(
          async ({ ctx, input }) => {
            const results =
              await db
                .select({
                  id:
                    featureRequests.id,

                  title:
                    featureRequests.title,

                  source:
                    featureRequests.source,

                  status:
                    featureRequests.status,
                })
                .from(
                  featureRequests,
                )
                .where(
                  eq(
                    featureRequests.projectId,
                    input.projectId,
                  ),
                );

            return results;
          },
        ),

    getFeatureRequest:
      protectedProcedure
        .input(
          getFeatureRequestInput,
        )
        .output(
          getFeatureRequestOutput,
        )
        .query(
          async ({ ctx, input }) => {
            const result =
              await db
                .select()
                .from(
                  featureRequests,
                )
                .where(
                  eq(
                    featureRequests.id,
                    input.featureRequestId,
                  ),
                )
                .limit(1);

            const feature =
              result[0];

            if (!feature) {
              throw new TRPCError({
                code:
                  "NOT_FOUND",
                message:
                  "Feature request not found",
              });
            }

            return {
              id: feature.id,

              projectId:
                feature.projectId,

              title:
                feature.title,

              description:
                feature.description,

              source:
                feature.source,

              status:
                feature.status,
            };
          },
        ),
        generatePRD: protectedProcedure
  .input(generatePRDInput)
  .output(generatePRDOutput)
  .mutation(async ({ input }) => {
    const result = await db
      .select()
      .from(featureRequests)
      .where(
        eq(
          featureRequests.id,
          input.featureRequestId,
        ),
      )
      .limit(1);

    const feature = result[0];

    if (!feature) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Feature request not found",
      });
    }

    const generated =
      await generatePRD({
        title: feature.title,
        description: feature.description,
      });

    const inserted = await db
      .insert(prds)
      .values({
        featureRequestId: feature.id,

        problemStatement:
          generated.problemStatement,

        goals: generated.goals,

        nonGoals: generated.nonGoals,

        userStories:
          generated.userStories,

        acceptanceCriteria:
          generated.acceptanceCriteria,

        edgeCases:
          generated.edgeCases,

        successMetrics:
          generated.successMetrics,

        status: "generated",
      })
      .returning({
        id: prds.id,
      });

    const prd = inserted[0];

    if (!prd) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to save PRD",
      });
    }

    await db
      .update(featureRequests)
      .set({
        status: "prd_generated",
      })
      .where(
        eq(
          featureRequests.id,
          feature.id,
        ),
      );

    return {
      prdId: prd.id,
    };
  }),   
  });