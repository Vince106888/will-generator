// file: apps/api/src/engines/draftEngine.ts
import { WillInput } from "../types";

export function generateDraft(input: WillInput): string {
  const assets = input.assets ?? [];
  const beneficiaries = input.beneficiaries ?? [];
  const country = input.country ?? "Kenya";
  const notes = input.instructions?.notes ? `\nNOTES:\n${input.instructions?.notes}` : "";
  const funeral = input.instructions?.funeralWishes
    ? `\nFUNERAL WISHES:\n${input.instructions?.funeralWishes}`
    : "";

  return `LAST WILL AND TESTAMENT\n\nI, ${input.name}, being of sound mind and disposing memory, declare this to be my last will and testament under the laws of ${country}.\n\nEXECUTOR\nI appoint ${input.executor} as the executor of this will.\n\nASSETS\n${assets.map((asset) => `- ${asset}`).join("\n") || "- (No assets listed)"}\n\nBENEFICIARIES\n${beneficiaries.map((b) => `- ${b}`).join("\n") || "- (No beneficiaries listed)"}\n${notes}${funeral}\n\nSIGNATURES\nSigned: ______________________\nDate: ________________________\nWitness 1: ___________________\nWitness 2: ___________________\n`;
}
