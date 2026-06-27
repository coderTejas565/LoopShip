import type { z } from "zod";

import { generatedPRDSchema } from "../schemas/prd";

export type GeneratePRDInput = {
  apiKey: string;
  title: string;
  description: string;
};

export type GeneratedPRD = z.infer<typeof generatedPRDSchema>;
