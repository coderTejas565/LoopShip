import { z } from "zod";

export const getPRDInput = z.object({
  prdId: z.string(),
});

export const getPRDOutput = z.object({
  id: z.string(),

  featureRequestId: z.string(),

  version: z.number(),

  problemStatement: z.string(),

  goals: z.array(z.string()),

  nonGoals: z.array(z.string()),

  userStories: z.array(z.string()),

  acceptanceCriteria: z.array(z.string()),

  edgeCases: z.array(z.string()),

  successMetrics: z.array(z.string()),

  status: z.enum(["draft", "generated", "approved", "archived"]),
});

export const updatePRDInput = z.object({
  prdId: z.string(),

  problemStatement: z.string(),

  goals: z.array(z.string()),

  nonGoals: z.array(z.string()),

  userStories: z.array(z.string()),

  acceptanceCriteria: z.array(z.string()),

  edgeCases: z.array(z.string()),

  successMetrics: z.array(z.string()),
});

export const updatePRDOutput = z.object({
  success: z.boolean(),
});

export const approvePRDInput = z.object({
  prdId: z.string(),
});

export const approvePRDOutput = z.object({
  success: z.boolean(),
});
