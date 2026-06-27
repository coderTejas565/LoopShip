import { z } from "zod";

export const createFeatureRequestInput = z.object({
  projectId: z.string(),

  title: z.string().min(3).max(200),

  description: z.string().min(10).max(5000),

  source: z.enum(["manual", "email", "support_ticket", "call"]),
});

export const createFeatureRequestOutput = z.object({
  id: z.string(),
});

export const getFeatureRequestInput = z.object({
  featureRequestId: z.string(),
});

export const getFeatureRequestOutput = z.object({
  id: z.string(),

  projectId: z.string(),

  title: z.string(),

  description: z.string(),

  source: z.enum(["manual", "email", "support_ticket", "call"]),

  status: z.enum(["draft", "clarification_needed", "approved", "rejected", "prd_generated"]),
});

export const getFeatureRequestsInput = z.object({
  projectId: z.string(),
});

export const getFeatureRequestsOutput = z.array(
  z.object({
    id: z.string(),

    title: z.string(),

    source: z.enum(["manual", "email", "support_ticket", "call"]),

    status: z.enum(["draft", "clarification_needed", "approved", "rejected", "prd_generated"]),
  }),
);
