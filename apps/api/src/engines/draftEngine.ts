// file: apps/api/src/engines/draftEngine.ts
import { DraftConsistencyReport, PersonRole, WillInput } from "../types";

function normalizeName(value: string | undefined | null) {
  return String(value ?? "").trim();
}

function getPrimaryExecutor(input: WillInput) {
  const metadataExecutors = input.metadata?.executors ?? [];
  const primaryFromMetadata = normalizeName(metadataExecutors[0]?.name);
  return primaryFromMetadata || normalizeName(input.executor);
}

function getAlternateExecutor(input: WillInput) {
  const metadataExecutors = input.metadata?.executors ?? [];
  const alternate = normalizeName(metadataExecutors[1]?.name);
  return alternate || "";
}

function getPrimaryGuardian(input: WillInput) {
  const guardians = input.metadata?.guardians ?? [];
  return normalizeName(guardians[0]?.name);
}

function buildIdentityClause(input: WillInput): string {
  const country = input.country ?? "Kenya";
  return [
    "1. WILL HEADER AND IDENTITY",
    `I, ${normalizeName(input.name) || "[TESTATOR NAME REQUIRED]"}, make this Last Will and Testament voluntarily under the laws of ${country}.`,
    "I declare that I am of sound mind and intend this document to set out my testamentary wishes."
  ].join("\n");
}

function buildDeclarationAndRevocationClause(): string {
  return [
    "2. DECLARATION AND REVOCATION",
    "I declare this to be my final will.",
    "I revoke all prior wills and codicils made by me to the extent they are inconsistent with this will."
  ].join("\n");
}

function describeRole(role: PersonRole | undefined, fallback: string) {
  const name = normalizeName(role?.name);
  if (!name) return fallback;
  const relationship = normalizeName(role?.relationship);
  const contact = normalizeName(role?.contact);
  const parts = [name, relationship ? `(${relationship})` : "", contact ? `- contact: ${contact}` : ""]
    .filter(Boolean)
    .join(" ");
  return parts;
}

function buildExecutorClause(input: WillInput): string {
  const primaryExecutor = getPrimaryExecutor(input);
  const alternateExecutor = getAlternateExecutor(input);
  const metadataExecutors = input.metadata?.executors ?? [];

  return [
    "3. EXECUTOR APPOINTMENT",
    primaryExecutor
      ? `I appoint ${describeRole(metadataExecutors[0], primaryExecutor)} as Executor of this will.`
      : "Executor not yet confirmed. This draft must be updated before execution.",
    alternateExecutor
      ? `If the primary Executor cannot or will not serve, I appoint ${describeRole(
          metadataExecutors[1],
          alternateExecutor
        )} as Alternate Executor.`
      : "No alternate Executor is currently named."
  ].join("\n");
}

function buildGuardianClause(input: WillInput): string {
  if (!input.hasMinors) {
    return [
      "4. GUARDIANSHIP",
      "No minor children have been identified from the provided information, so no guardian clause is activated in this draft."
    ].join("\n");
  }

  const guardian = getPrimaryGuardian(input);
  const guardians = input.metadata?.guardians ?? [];
  const minors = input.metadata?.minorChildren?.filter((child) => child.trim()) ?? [];
  const minorsText = minors.length ? `for the following minors: ${minors.join(", ")}` : "for my minor children";

  return [
    "4. GUARDIANSHIP",
    guardian
      ? `If at my death any of my children are minors, I appoint ${describeRole(
          guardians[0],
          guardian
        )} to act as guardian ${minorsText}.`
      : "Minor children are indicated but no guardian has been clearly appointed yet."
  ].join("\n");
}

function buildSpecificGiftsClause(input: WillInput): string {
  const allocations = input.metadata?.assetAllocations ?? [];
  const beneficiaries = input.beneficiaries ?? [];

  if (!allocations.length) {
    const fallbackLines = (input.assets ?? []).map((asset) => `- ${asset}: to be administered by Executor for distribution to named beneficiaries.`);
    return [
      "5. SPECIFIC GIFTS / ALLOCATIONS",
      fallbackLines.length
        ? fallbackLines.join("\n")
        : "- No specific gifts were captured. Use the residuary clause and update this section where possible.",
      beneficiaries.length ? `Named beneficiaries: ${beneficiaries.join(", ")}.` : "No beneficiaries clearly listed yet."
    ].join("\n");
  }

  const lines = allocations.map((allocation) => {
    const assetLabel = allocation.assetLabel?.trim() || "Unlabelled asset";
    if (!allocation.allocations.length) {
      return `- ${assetLabel}: allocation unclear (requires confirmation).`;
    }
    const targets = allocation.allocations
      .map((entry) => {
        const beneficiary = entry.beneficiary?.trim() || "Unnamed beneficiary";
        const share = entry.share?.trim() ? ` (${entry.share.trim()})` : "";
        return `${beneficiary}${share}`;
      })
      .join(", ");
    return `- ${assetLabel}: ${targets}.`;
  });

  return ["5. SPECIFIC GIFTS / ALLOCATIONS", ...lines].join("\n");
}

function buildSurvivorshipAndResidueClause(input: WillInput): string {
  const remainderClause = normalizeName(input.metadata?.remainderClause);
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const fallback =
    beneficiaries.length > 0
      ? `I give the residue of my estate to ${beneficiaries.join(", ")} in equal shares, subject to survivorship.`
      : "I direct my Executor to hold and distribute the residue according to applicable succession law if no clear beneficiary instruction is confirmed.";

  return [
    "6. SURVIVORSHIP AND RESIDUARY ESTATE",
    "Any beneficiary who does not survive me by at least thirty (30) days will be treated as having predeceased me for distribution purposes unless contrary law applies.",
    remainderClause
      ? `Residuary direction provided: ${remainderClause}`
      : `Residuary fallback direction: ${fallback}`
  ].join("\n");
}

function buildFuneralAndSpecialWishesClause(input: WillInput): string {
  const funeral = normalizeName(input.instructions?.funeralWishes);
  const notes = normalizeName(input.instructions?.notes);
  const special = input.metadata?.specialWishes?.filter((item) => item.trim()) ?? [];
  const specialCombined = [...special, notes].filter(Boolean).join("\n- ");

  return [
    "7. FUNERAL AND SPECIAL WISHES (NON-BINDING GUIDANCE)",
    "The following wishes are guidance to my family and Executor and are generally non-binding unless law expressly provides otherwise:",
    funeral ? `- Funeral wishes: ${funeral}` : "- Funeral wishes not specified.",
    specialCombined ? `- Other wishes:\n- ${specialCombined}` : "- No additional special wishes recorded."
  ].join("\n");
}

function buildAttestationGuidanceClause(): string {
  return [
    "8. EXECUTION AND ATTESTATION GUIDANCE (KENYA-FIRST)",
    "Sign this will in the physical presence of at least two eligible witnesses.",
    "Witnesses should not be beneficiaries or spouses of beneficiaries.",
    "Use full legal names and keep each signature block dated.",
    "If your situation involves minors, conflict risk, foreign assets, or significant complexity, seek advocate review before execution.",
    "",
    "TESTATOR SIGNATURE: _______________________    DATE: _______________________",
    "WITNESS 1 NAME/SIGNATURE: _______________________",
    "WITNESS 2 NAME/SIGNATURE: _______________________"
  ].join("\n");
}

export function assessDraftConsistency(input: WillInput): DraftConsistencyReport {
  const blockingIssues: string[] = [];
  const warnings: string[] = [];

  const executor = getPrimaryExecutor(input);
  const hasMinors = Boolean(input.hasMinors);
  const guardian = getPrimaryGuardian(input);
  const remainder = normalizeName(input.metadata?.remainderClause);
  const assets = input.assets ?? [];
  const beneficiaries = (input.beneficiaries ?? []).filter((name) => name.trim());
  const allocations = input.metadata?.assetAllocations ?? [];

  if (!executor) {
    blockingIssues.push("Missing executor: appoint at least one executor before final draft generation.");
  }

  if (hasMinors && !guardian) {
    blockingIssues.push("Minor children are present but no guardian is specified.");
  }

  if (!remainder && beneficiaries.length === 0) {
    blockingIssues.push("No clear residuary estate instruction or fallback beneficiaries found.");
  }

  if (assets.length > 0 && beneficiaries.length === 0) {
    blockingIssues.push("Assets are listed but no beneficiaries are clearly named.");
  }

  const allocationWarnings = allocations.flatMap((allocation) => {
    const assetLabel = allocation.assetLabel?.trim() || "Unlabelled asset";
    if (!allocation.allocations.length) {
      return [`${assetLabel} has no beneficiary allocation yet.`];
    }
    const invalidEntries = allocation.allocations.filter((entry) => !entry.beneficiary?.trim());
    if (invalidEntries.length > 0) {
      return [`${assetLabel} includes incomplete allocation entries.`];
    }
    return [];
  });
  warnings.push(...allocationWarnings);

  if (!remainder) {
    warnings.push("No custom remainder clause provided; deterministic fallback language will apply.");
  }

  return { blockingIssues, warnings };
}

export function generateDraft(input: WillInput): string {
  const clauses = [
    "LAST WILL AND TESTAMENT",
    "",
    buildIdentityClause(input),
    "",
    buildDeclarationAndRevocationClause(),
    "",
    buildExecutorClause(input),
    "",
    buildGuardianClause(input),
    "",
    buildSpecificGiftsClause(input),
    "",
    buildSurvivorshipAndResidueClause(input),
    "",
    buildFuneralAndSpecialWishesClause(input),
    "",
    buildAttestationGuidanceClause()
  ];

  return clauses.join("\n");
}
