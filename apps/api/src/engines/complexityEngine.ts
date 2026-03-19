// file: apps/api/src/engines/complexityEngine.ts
import { ComplexityResult, WillInput } from "../types";
import weights from "./complexityWeights.json";

export function computeComplexity(input: WillInput): ComplexityResult {
  let score = 0;
  const flags: string[] = [];

  if (input.hasMinors) {
    score += weights.hasMinors;
    flags.push("MINORS_PRESENT");
  }

  if (input.multipleHouseholds) {
    score += weights.multipleHouseholds;
    flags.push("MULTIPLE_HOUSEHOLDS");
  }

  if ((input.assets?.length ?? 0) > weights.assetThreshold) {
    score += weights.assetWeight;
    flags.push("MANY_ASSETS");
  }

  let level: ComplexityResult["level"] = "LOW";
  if (score >= 5) level = "HIGH";
  else if (score >= 3) level = "MEDIUM";

  return { score, level, flags };
}
