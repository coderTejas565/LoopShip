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
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    }
  }

  const session = await auth.api.getSession({
    headers,
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
