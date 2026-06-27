import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import { db } from "@repo/database";
import { auth } from "@repo/auth";

export interface Context {
  db: typeof db;

  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export async function createContext({ req }: CreateExpressContextOptions): Promise<Context> {
  const session = await auth.api.getSession({
    headers: new Headers(
      Object.entries(req.headers)
        .filter(([, value]) => typeof value === "string")
        .map(([key, value]) => [key, value as string]),
    ),
  });

  return {
    db,

    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        }
      : null,
  };
}
