import { httpLink, httpBatchStreamLink } from "@repo/trpc/client";
import { headers } from "next/headers";
import { env } from "~/env.js";

interface CreateTRPCHttpBatchClientClientOpts {
  enableStreaming?: boolean;
}

export const createTRPCHttpBatchClientClient = (opts?: CreateTRPCHttpBatchClientClientOpts) => {
  const c = opts?.enableStreaming ? httpBatchStreamLink : httpLink;

  return c({
    url: env.NEXT_PUBLIC_API_URL ?? "/trpc",

    async headers() {
      const heads = await headers();

      return {
        cookie: heads.get("cookie") ?? "",
      };
    },

    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    },
  });
};
