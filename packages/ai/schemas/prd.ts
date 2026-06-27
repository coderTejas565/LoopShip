import { z } from "zod";

export const generatedPRDSchema = z.object({
  problemStatement: z.string().describe("A concise explanation of the user's problem."),

  goals: z
    .array(z.string().describe("A measurable product goal."))
    .describe("Primary goals of the feature."),

  nonGoals: z
    .array(z.string().describe("What is explicitly out of scope."))
    .describe("Non-goals for this release."),

  userStories: z
    .array(z.string().describe("User story in 'As a... I want... so that...' format."))
    .describe("User stories."),

  acceptanceCriteria: z
    .array(z.string().describe("A testable acceptance criterion."))
    .describe("Acceptance criteria."),

  edgeCases: z.array(z.string().describe("Potential edge case.")).describe("Edge cases."),

  successMetrics: z
    .array(z.string().describe("A measurable success metric."))
    .describe("Metrics used to measure success."),
});

export type GeneratedPRD = z.infer<typeof generatedPRDSchema>;
