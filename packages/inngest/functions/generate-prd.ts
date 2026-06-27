import { inngest } from "../client";
import { events } from "../events";

import { generatePRD } from "@repo/ai";

import { env } from "../env";

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
    const apiKey = env.GOOGLE_GENERATIVE_AI_API_KEY;

    const prd = await step.run("generate-prd", async () => {
      return generatePRD({
        apiKey,
        title: event.data.title,
        description: event.data.description,
      });
    });

    console.log("Generated PRD", prd);

    return {
      success: true,
      prd,
    };
  },
);
