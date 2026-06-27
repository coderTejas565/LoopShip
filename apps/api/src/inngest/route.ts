import express from "express";
import { serve } from "inngest/express";

import { inngest, generatePRDFunction } from "@repo/inngest";

export const inngestRouter = express.Router();

inngestRouter.use(
  "/",
  serve({
    client: inngest,

    functions: [generatePRDFunction],
  }),
);
