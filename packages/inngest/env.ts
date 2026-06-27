import { config } from "dotenv";
import path from "node:path";
import { z } from "zod";

// Load the root .env
config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const envSchema = z.object({
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");

  for (const issue of parsed.error.issues) {
    console.error(`${issue.path.join(".")}: ${issue.message}`);
  }

  throw new Error("Invalid environment variables in @repo/inngest");
}

export const env = parsed.data;