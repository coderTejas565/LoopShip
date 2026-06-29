import { z } from "zod";

export const listRepositoriesOutput = z.array(
  z.object({
    id: z.number(),

    name: z.string(),

    fullName: z.string(),

    owner: z.string(),

    defaultBranch: z.string(),

    private: z.boolean(),

    description: z.string().nullable(),

    htmlUrl: z.string(),
  }),
);
