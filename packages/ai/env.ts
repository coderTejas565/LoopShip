import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}

export const env = createEnv(process.env);