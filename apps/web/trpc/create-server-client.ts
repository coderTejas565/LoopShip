import { headers } from "next/headers";

import { httpLink, httpBatchStreamLink } from "@repo/trpc/client";

import { env } from "~/env";

interface Options {
  enableStreaming?: boolean;
}

export const createServerTRPCLink = (opts?: Options) => {
  const link = opts?.enableStreaming ? httpBatchStreamLink : httpLink;

  return link({
    url: env.NEXT_PUBLIC_API_URL ?? "/trpc",

    async headers() {
      const h = await headers();

      return {
        cookie: h.get("cookie") ?? "",
      };
    },
  });
};
