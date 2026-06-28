import { config } from "dotenv";
import path from "node:path";
import { z } from "zod";

config({
  path: path.resolve(process.cwd(), "../../.env"),
});

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(parsed.error.message);
}

export const env = parsed.data;
