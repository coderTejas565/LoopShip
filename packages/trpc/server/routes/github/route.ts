import { TRPCError } from "@trpc/server";

import { account, and, eq, db } from "@repo/database";

import { getRepositories } from "@repo/github";

import { protectedProcedure, router } from "../../trpc";

import { listRepositoriesOutput } from "./model";

export const githubRouter = router({
  listRepositories: protectedProcedure.output(listRepositoriesOutput).query(async ({ ctx }) => {
    const result = await db
      .select({
        accessToken: account.accessToken,
      })
      .from(account)
      .where(and(eq(account.userId, ctx.user.id), eq(account.providerId, "github")))
      .limit(1);

    const githubAccount = result[0];

    if (!githubAccount) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "GitHub account not connected",
      });
    }

    if (!githubAccount.accessToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "GitHub access token not found",
      });
    }

    return getRepositories(githubAccount.accessToken);
  }),
});
