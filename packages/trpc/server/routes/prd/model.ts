import { z } from "zod";

const stringArray = z.array(z.string().min(1));

export const prdStatusSchema = z.enum(["draft", "generated", "approved", "archived"]);

export const prdSchema = z.object({
  id: z.uuid(),

  featureRequestId: z.uuid(),

  version: z.number(),

  problemStatement: z.string(),

  goals: stringArray,

  nonGoals: stringArray,

  userStories: stringArray,

  acceptanceCriteria: stringArray,

  edgeCases: stringArray,

  successMetrics: stringArray,

  status: prdStatusSchema,
});

export const getPRDInput = z.object({
  prdId: z.uuid(),
});

export const getPRDOutput = prdSchema;

export const updatePRDInput = z.object({
  prdId: z.uuid(),

  problemStatement: z.string().min(1),

  goals: stringArray,

  nonGoals: stringArray,

  userStories: stringArray,

  acceptanceCriteria: stringArray,

  edgeCases: stringArray,

  successMetrics: stringArray,
});

export const updatePRDOutput = z.object({
  success: z.boolean(),
});

export const approvePRDInput = z.object({
  prdId: z.uuid(),
});

export const approvePRDOutput = z.object({
  success: z.boolean(),
});

export const getPRDByFeatureRequestInput = z.object({
  featureRequestId: z.string(),
});

export const getPRDByFeatureRequestOutput = getPRDOutput.nullable();
