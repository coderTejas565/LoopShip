import { z } from "zod";

export const createProjectInput = z.object({
  organizationId: z.string(),

  name: z.string().min(3).max(100),

  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),

  description: z.string().max(500).optional(),
});

export const createProjectOutput = z.object({
  id: z.string(),
});

export const getProjectInput = z.object({
  projectId: z.string(),
});

export const getProjectOutput = z.object({
  id: z.string(),

  organizationId: z.string(),

  name: z.string(),

  slug: z.string(),

  description: z.string().nullable(),

  status: z.enum(["active", "archived"]),

  githubRepository: z.string().nullable(),

  defaultBranch: z.string().nullable(),
});

export const getProjectsInput = z.object({
  organizationId: z.string(),
});

export const getProjectsOutput = z.array(
  z.object({
    id: z.string(),

    name: z.string(),

    slug: z.string(),

    description: z.string().nullable(),

    status: z.enum(["active", "archived"]),
  }),
);
