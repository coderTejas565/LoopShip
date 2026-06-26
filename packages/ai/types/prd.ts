import type { z } from "zod";

import { generatedPRDSchema } from "../schemas/prd";

export interface GeneratePRDInput {
  title: string;

  description: string;
}

export type GeneratedPRD = z.infer<
  typeof generatedPRDSchema
>;