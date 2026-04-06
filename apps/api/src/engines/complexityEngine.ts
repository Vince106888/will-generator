// file: apps/api/src/engines/complexityEngine.ts
import { ComplexityResult, WillInput } from "../types";
import weights from "./complexityWeights.json";

export function computeComplexity(input: WillInput): ComplexityResult {
  let score = 0;
  const flags: string[] = [];
  const factors: ComplexityResult["factors"] = [];

  const addFactor = (flag: string, weight: number, reason: string) => {
    score += weight;
    flags.push(flag);
    factors.push({ flag, weight, reason });
  };

  if (input.hasMinors) {
    addFactor("MINORS_PRESENT", weights.hasMinors, "Minor children increase guardianship and execution risk.");
  }

  if (input.multipleHouseholds) {
    addFactor(
      "MULTIPLE_HOUSEHOLDS",
      weights.multipleHouseholds,
      "Multiple households can increase distribution and dispute complexity."
    );
  }

  const assetDetails = input.metadata?.assetDetails ?? [];
  const hasForeignAssets = assetDetails.some((asset) => asset.isForeign === true);
  if (hasForeignAssets) {
    addFactor(
      "FOREIGN_ASSETS",
      weights.foreignAssets,
      "Foreign assets may require cross-border legal handling."
    );
  }

  const hasBusinessInterests = assetDetails.some(
    (asset) => asset.isBusinessInterest === true || asset.type === "BUSINESS"
  );
  if (hasBusinessInterests) {
    addFactor(
      "BUSINESS_INTERESTS",
      weights.businessInterests,
      "Business interests often require more detailed succession planning."
    );
  }

  const hasDigitalAssets = assetDetails.some(
    (asset) => asset.isDigitalAsset === true || asset.type === "DIGITAL"
  );
  if (hasDigitalAssets) {
    addFactor(
      "DIGITAL_ASSETS",
      weights.digitalAssets,
      "Digital assets require access and custody planning."
    );
  }

  const hasConflictSignal = (input.metadata?.disinheritanceSignals?.length ?? 0) > 0;
  if (hasConflictSignal) {
    addFactor(
      "FAMILY_CONFLICT_SIGNAL",
      weights.familyConflict,
      "Potential conflict/disinheritance signal suggests higher contest risk."
    );
  }

  const hasExecutorGap = !String(input.executor ?? "").trim() && !(input.metadata?.executors?.[0]?.name ?? "").trim();
  if (hasExecutorGap) {
    addFactor(
      "EXECUTOR_GAP",
      weights.executorGap,
      "No clear executor currently identified."
    );
  }

  const hasGuardianGap = input.hasMinors && !(input.metadata?.guardians?.[0]?.name ?? "").trim();
  if (hasGuardianGap) {
    addFactor(
      "GUARDIAN_GAP",
      weights.guardianGap,
      "Minors exist but guardian is not clearly captured."
    );
  }

  if ((input.assets?.length ?? 0) > weights.assetThreshold) {
    addFactor(
      "MANY_ASSETS",
      weights.assetWeight,
      `Asset count above threshold (${weights.assetThreshold}).`
    );
  }

  if ((input.beneficiaries?.length ?? 0) > weights.beneficiaryThreshold) {
    addFactor(
      "MANY_BENEFICIARIES",
      weights.beneficiaryWeight,
      `Beneficiary count above threshold (${weights.beneficiaryThreshold}).`
    );
  }

  let level: ComplexityResult["level"] = "LOW";
  if (score >= 7) level = "HIGH";
  else if (score >= 3) level = "MEDIUM";

  return { score, level, flags, factors };
}
