// file: apps/api/src/engines/validityEngine.ts
import { ComplexityResult, ValidityResult, WillInput } from "../types";

export function getValidityChecklist(
  input?: Pick<WillInput, "hasMinors" | "multipleHouseholds" | "metadata" | "beneficiaries" | "executor" | "name">,
  complexity?: ComplexityResult
): ValidityResult {
  const hasMinors = Boolean(input?.hasMinors);
  const conflictSignal = (input?.metadata?.disinheritanceSignals?.length ?? 0) > 0;
  const hasForeignAssets =
    (input?.metadata?.assetDetails ?? []).some((asset) => asset.isForeign === true) ||
    complexity?.flags.includes("FOREIGN_ASSETS");
  const guardianGap = complexity?.flags.includes("GUARDIAN_GAP") ||
    (hasMinors && !(input?.metadata?.guardians?.[0]?.name ?? "").trim());
  const executorGap = complexity?.flags.includes("EXECUTOR_GAP") || !(input?.executor ?? "").trim();
  const beneficiaryGap = (input?.beneficiaries ?? []).filter((name) => name.trim()).length === 0;
  const nameGap = !(input?.name ?? "").trim() || (input?.name ?? "").trim().toLowerCase() === "unknown";
  const remainderGap = !(input?.metadata?.remainderClause ?? "").trim();

  const checklist: ValidityResult["checklist"] = [
    {
      code: "KE_SIGN_TESTATOR",
      message: "The testator should sign the will personally (or lawfully acknowledge their signature).",
      severity: "CRITICAL"
    },
    {
      code: "KE_TWO_WITNESSES",
      message: "Use at least two competent witnesses present at signing.",
      severity: "CRITICAL"
    },
    {
      code: "KE_WITNESS_BENEFICIARY_WARNING",
      message: "Witnesses should not be beneficiaries or spouses of beneficiaries.",
      severity: "WARNING"
    },
    {
      code: "KE_EXECUTION_PRESENCE",
      message: "Signing should be done in the presence of the witnesses in one execution session.",
      severity: "CRITICAL"
    }
  ];

  const warnings: string[] = [];
  const executionGuidance: string[] = [
    "Use full legal names for the testator and witnesses on the execution page.",
    "Date signatures clearly and keep pages together in the final signed copy.",
    "All parties should sign in the same sitting; do not pre-sign pages.",
    "Avoid beneficiaries serving as witnesses to prevent validity disputes.",
    "If the testator cannot sign, use an assisted signature or mark in front of witnesses.",
    "Do not rely on draft text alone; validity depends on proper execution formalities."
  ];
  const storageGuidance: string[] = [
    "Store the original signed will in a secure, dry location.",
    "Inform executor and a trusted person where the original will is stored.",
    "Review and update the will after major life events (marriage, divorce, births, major asset changes)."
  ];
  const advocateReviewReasons: string[] = [];

  if (nameGap) {
    warnings.push("Legal name appears missing or unclear; the signed will should include the testator's full legal name.");
  }

  if (beneficiaryGap && remainderGap) {
    warnings.push("No beneficiaries or residuary clause are clearly stated; update before signing.");
    advocateReviewReasons.push("Missing beneficiary or residuary instructions.");
  }

  if (guardianGap) {
    warnings.push("Minor children are indicated but guardian details appear incomplete.");
    advocateReviewReasons.push("Minor children without complete guardianship details.");
  }

  if (executorGap) {
    warnings.push("Executor details appear incomplete, which can delay estate administration.");
    advocateReviewReasons.push("Missing or unclear executor appointment.");
  }

  if (complexity?.level === "HIGH") {
    warnings.push("Complex estate profile detected; legal review is strongly recommended before signing.");
    advocateReviewReasons.push("Deterministic complexity score indicates high estate complexity.");
  }

  if (hasForeignAssets) {
    warnings.push("Foreign assets may require cross-border succession handling.");
    advocateReviewReasons.push("Foreign asset presence may require jurisdiction-specific handling.");
  }

  if (input?.multipleHouseholds) {
    warnings.push("Multiple-household context may require careful beneficiary and dependency drafting.");
    advocateReviewReasons.push("Multiple-household family structure raises potential contest risk.");
  }

  if (conflictSignal) {
    warnings.push("Potential family conflict/disinheritance signal detected; ensure reasons and allocations are clearly documented.");
    advocateReviewReasons.push("Potential family conflict or disinheritance signal.");
  }

  return {
    checklist,
    warnings,
    executionGuidance,
    storageGuidance,
    advocateReviewRecommended: advocateReviewReasons.length > 0,
    advocateReviewReasons
  };
}
