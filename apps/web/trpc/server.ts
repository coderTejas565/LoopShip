import type { ServerRouter } from "@repo/trpc/client";
import { createTRPCProxyClient } from "@repo/trpc/client";

import { createServerTRPCLink } from "~/trpc/create-server-client";
import { createTRPCHttpBatchClientClient } from "~/trpc/create-client";

export const api = () =>
  createTRPCProxyClient<ServerRouter>({
    links: [createServerTRPCLink()],
  });

export const apiStreaming = createTRPCProxyClient<ServerRouter>({
  links: [
    createTRPCHttpBatchClientClient({
      enableStreaming: true,
    }),
  ],
});
