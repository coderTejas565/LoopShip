import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);

  if (!safeParseResult.success) {
    throw new Error(safeParseResult.error.message);
  }

  return safeParseResult.data;
}

export const env = createEnv(process.env);
