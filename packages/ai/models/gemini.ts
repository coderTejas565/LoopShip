import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function createModel(apiKey: string) {
  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google("gemini-2.5-flash");
}
