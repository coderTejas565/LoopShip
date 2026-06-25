import { z } from "zod";

export const createOrganizationInput = z.object({
  name: z
    .string()
    .min(3)
    .max(100),

  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
});

export const createOrganizationOutput = z.object({
  id: z.string(),
});

export const getCurrentOrganizationOutput = z.object({
  id: z.string(),

  name: z.string(),

  slug: z.string(),

  imageUrl: z.string().nullable(),

  plan: z.enum([
    "free",
    "pro",
    "enterprise",
  ]),

  role: z.enum([
    "owner",
    "admin",
    "member",
  ]),
});

export const getOrganizationsOutput = z.array(
  z.object({
    id: z.string(),

    name: z.string(),

    slug: z.string(),

    imageUrl: z.string().nullable(),

    plan: z.enum([
      "free",
      "pro",
      "enterprise",
    ]),

    role: z.enum([
      "owner",
      "admin",
      "member",
    ]),
  }),
);