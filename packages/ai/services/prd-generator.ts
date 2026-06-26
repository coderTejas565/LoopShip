import {
  generateText,
  NoObjectGeneratedError,
  Output,
} from "ai";

import { google } from "../providers/google";

import { PRD_SYSTEM_PROMPT } from "../prompts/prd";

import { generatedPRDSchema } from "../schemas/prd";

import type {
  GeneratePRDInput,
  GeneratedPRD,
} from "../types/prd";

export async function generatePRD(
  input: GeneratePRDInput,
): Promise<GeneratedPRD> {
  try {
    const { output } = await generateText({
      model: google("gemini-2.5-flash"),

      system: PRD_SYSTEM_PROMPT,

      prompt: `
Feature Title:
${input.title}

Feature Description:
${input.description}
`,

      output: Output.object({
        name: "ProductRequirementDocument",

        description:
          "A production-ready Product Requirement Document.",

        schema: generatedPRDSchema,
      }),
    });

    return output;
  } catch (error) {
    if (
      NoObjectGeneratedError.isInstance(error)
    ) {
      console.error(
        "Failed to generate valid structured output",
      );

      console.error(error.text);

      console.error(error.cause);

      console.error(error.usage);

      throw new Error(
        "AI failed to generate a valid Product Requirement Document.",
      );
    }

    throw error;
  }
}