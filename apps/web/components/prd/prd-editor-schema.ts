import { z } from "zod";

export const prdEditorSchema = z.object({
  problemStatement: z.string().min(1),

  goals: z.array(z.string()),

  nonGoals: z.array(z.string()),

  userStories: z.array(z.string()),

  acceptanceCriteria: z.array(z.string()),

  edgeCases: z.array(z.string()),

  successMetrics: z.array(z.string()),
});

export type PRDEditorValues = z.infer<typeof prdEditorSchema>;
