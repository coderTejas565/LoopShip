export function createSystemPrompt(role: string, instructions: string[]) {
  return `
You are ${role}.

Rules:

${instructions.map((rule) => `- ${rule}`).join("\n")}
`;
}
