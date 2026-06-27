import { inngest } from "../client";
import { events } from "../events";
import { env } from "../env";

import { generatePRD } from "@repo/ai";

import { db, eq, featureRequests, prds } from "@repo/database";

export const generatePRDFunction = inngest.createFunction(
  {
    id: "generate-prd",

    name: "Generate PRD",

    retries: 3,

    triggers: [
      {
        event: events.featureRequestCreated,
      },
    ],
  },

  async ({ event, step }) => {
    // Step 1: Load Feature Request
    const feature = await step.run("load-feature-request", async () => {
      const result = await db
        .select()
        .from(featureRequests)
        .where(eq(featureRequests.id, event.data.featureRequestId))
        .limit(1);

      const feature = result[0];

      if (!feature) {
        throw new Error("Feature request not found");
      }

      return feature;
    });

    // Step 2: Generate PRD with AI
    const generated = await step.run("generate-prd", async () => {
      return await generatePRD({
        apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,

        title: feature.title,

        description: feature.description,
      });
    });

    // Step 3: Save PRD
    const prd = await step.run("save-prd", async () => {
      const inserted = await db
        .insert(prds)
        .values({
          featureRequestId: feature.id,

          problemStatement: generated.problemStatement,

          goals: generated.goals,

          nonGoals: generated.nonGoals,

          userStories: generated.userStories,

          acceptanceCriteria: generated.acceptanceCriteria,

          edgeCases: generated.edgeCases,

          successMetrics: generated.successMetrics,

          status: "generated",
        })
        .returning({
          id: prds.id,
        });

      const prd = inserted[0];

      if (!prd) {
        throw new Error("Failed to save PRD");
      }

      return prd;
    });

    // Step 4: Update Feature Request Status
    await step.run("update-feature-status", async () => {
      await db
        .update(featureRequests)
        .set({
          status: "prd_generated",
        })
        .where(eq(featureRequests.id, feature.id));
    });

    return {
      success: true,

      featureRequestId: feature.id,

      prdId: prd.id,
    };
  },
);
