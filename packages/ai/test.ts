import "dotenv/config";

import { generatePRD } from "./services/prd-generator";

async function main() {
  try {
    const prd = await generatePRD({
      title: "AI Generated PRD",

      description:
        "Users should be able to submit feature ideas and automatically generate a structured Product Requirement Document using AI.",
    });

    console.log(
      JSON.stringify(prd, null, 2),
    );
  } catch (error) {
    console.error(error);
  }
}

main();