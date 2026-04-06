// file: apps/api/src/engines/draftEngine.ts
import { DraftConsistencyReport, PersonRole, WillInput } from "../types";

function normalizeName(value: string | undefined | null) {
  return String(value ?? "").trim();
}

function formatBullets(lines: string[]) {
  return lines.filter(Boolean).map((line) => `- ${line}`);
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

function getAlternateGuardian(input: WillInput) {
  const guardians = input.metadata?.guardians ?? [];
  return normalizeName(guardians[1]?.name);
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

function buildIdentityClause(input: WillInput): string {
  const country = input.country ?? "Kenya";
  const name = normalizeName(input.name) || "[TESTATOR NAME REQUIRED]";
  return [
    "SECTION 1: TESTATOR IDENTITY",
    `I, ${name}, declare this to be my Last Will and Testament made voluntarily under the laws of ${country}.`,
    "I affirm that I am of sound mind and acting freely.",
    "I revoke all prior wills and codicils made by me to the extent they are inconsistent with this will."
  ].join("\n");
}

function buildFamilyContextClause(input: WillInput): string {
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const minorChildren = input.metadata?.minorChildren ?? [];
  const lines = [
    beneficiaries.length ? `Named beneficiaries: ${beneficiaries.join(", ")}.` : "No beneficiaries are fully confirmed yet.",
    input.hasMinors
      ? minorChildren.length
        ? `Minor children identified: ${minorChildren.join(", ")}.`
        : "Minor children are indicated; names should be confirmed."
      : "No minor children are indicated.",
    input.multipleHouseholds
      ? "Multiple household context noted; ensure beneficiary allocations are precise."
      : ""
  ].filter(Boolean);

  return ["SECTION 2: FAMILY AND BENEFICIARY CONTEXT", ...lines].join("\n");
}

function buildExecutorClause(input: WillInput): string {
  const primaryExecutor = getPrimaryExecutor(input);
  const alternateExecutor = getAlternateExecutor(input);
  const metadataExecutors = input.metadata?.executors ?? [];

  return [
    "SECTION 3: EXECUTOR APPOINTMENT",
    primaryExecutor
      ? `I appoint ${describeRole(metadataExecutors[0], primaryExecutor)} as the Executor of this will.`
      : "Executor not yet confirmed. This draft must be updated before signing.",
    alternateExecutor
      ? `If the primary Executor cannot or will not serve, I appoint ${describeRole(
          metadataExecutors[1],
          alternateExecutor
        )} as Alternate Executor.`
      : "No alternate Executor is currently named.",
    "My Executor should settle debts and expenses, collect assets, and distribute the estate according to this will."
  ].join("\n");
}

function buildGuardianClause(input: WillInput): string {
  if (!input.hasMinors) {
    return [
      "SECTION 4: GUARDIANSHIP (IF MINORS)",
      "No minor children have been identified from the provided information, so no guardian clause is activated in this draft."
    ].join("\n");
  }

  const guardian = getPrimaryGuardian(input);
  const alternateGuardian = getAlternateGuardian(input);
  const guardians = input.metadata?.guardians ?? [];
  const minors = input.metadata?.minorChildren?.filter((child) => child.trim()) ?? [];
  const minorsText = minors.length ? `for the following minors: ${minors.join(", ")}` : "for my minor children";

  return [
    "SECTION 4: GUARDIANSHIP (IF MINORS)",
    guardian
      ? `If at my death any of my children are minors, I appoint ${describeRole(
          guardians[0],
          guardian
        )} to act as guardian ${minorsText}.`
      : "Minor children are indicated but no guardian has been clearly appointed yet.",
    alternateGuardian
      ? `If the primary guardian cannot act, I appoint ${describeRole(
          guardians[1],
          alternateGuardian
        )} as alternate guardian.`
      : "No alternate guardian is currently named."
  ].join("\n");
}

function buildSpecificGiftsClause(input: WillInput): string {
  const allocations = input.metadata?.assetAllocations ?? [];
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const assetDetails = input.metadata?.assetDetails ?? [];

  if (!allocations.length) {
    const fallbackLines = (input.assets ?? []).map(
      (asset) => `- ${asset}: to be administered by the Executor for distribution to named beneficiaries.`
    );
    const assetDetailLines = assetDetails
      .map((asset) => {
        const details = [asset.label, asset.details].filter(Boolean).join(" - ");
        return details ? `- ${details}` : "";
      })
      .filter(Boolean);

    const lines = fallbackLines.length ? fallbackLines : assetDetailLines;

    return [
      "SECTION 5: SPECIFIC GIFTS / ALLOCATIONS",
      lines.length ? lines.join("\n") : "- No specific gifts were captured yet.",
      beneficiaries.length
        ? `Named beneficiaries: ${beneficiaries.join(", ")}.`
        : "No beneficiaries clearly listed yet."
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

  return ["SECTION 5: SPECIFIC GIFTS / ALLOCATIONS", ...lines].join("\n");
}

function buildResiduaryClause(input: WillInput): string {
  const remainderClause = normalizeName(input.metadata?.remainderClause);
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const fallback =
    beneficiaries.length > 0
      ? `I give the residue of my estate to ${beneficiaries.join(", ")} in equal shares, subject to survivorship.`
      : "I direct my Executor to hold and distribute the residue according to applicable succession law if no clear beneficiary instruction is confirmed.";

  return [
    "SECTION 6: RESIDUARY ESTATE",
    "Any beneficiary who does not survive me by at least thirty (30) days will be treated as having predeceased me for distribution purposes unless contrary law applies.",
    remainderClause
      ? `Residuary direction provided: ${remainderClause}`
      : `Residuary fallback direction: ${fallback}`
  ].join("\n");
}

function buildDebtsAndExpensesClause(): string {
  return [
    "SECTION 7: DEBTS AND EXPENSES",
    "I direct my Executor to pay my enforceable debts, taxes, and reasonable funeral and administration expenses before distributing the estate."
  ].join("\n");
}

function buildSpecialWishesClause(input: WillInput): string {
  const funeral = normalizeName(input.instructions?.funeralWishes);
  const notes = normalizeName(input.instructions?.notes);
  const special = input.metadata?.specialWishes?.filter((item) => item.trim()) ?? [];
  const specialCombined = [...special, notes].filter(Boolean);

  return [
    "SECTION 8: FUNERAL AND SPECIAL WISHES (NON-BINDING GUIDANCE)",
    "The following wishes are guidance to my family and Executor and are generally non-binding unless law expressly provides otherwise:",
    ...formatBullets([
      funeral ? `Funeral wishes: ${funeral}` : "Funeral wishes not specified.",
      specialCombined.length ? `Other wishes: ${specialCombined.join(" | ")}` : "No additional special wishes recorded."
    ])
  ].join("\n");
}

function buildAttestationGuidanceClause(): string {
  return [
    "SECTION 9: EXECUTION AND ATTESTATION GUIDANCE (KENYA-FIRST)",
    "Sign this will in the physical presence of at least two eligible witnesses.",
    "Witnesses should not be beneficiaries or spouses of beneficiaries.",
    "All signatures should be completed in the same sitting, with the date written clearly.",
    "Use full legal names for the testator and witnesses; include contact details where possible.",
    "If you are unable to sign, the law permits a signed mark or assisted signing in the presence of witnesses.",
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

  const name = normalizeName(input.name);
  const executor = getPrimaryExecutor(input);
  const hasMinors = Boolean(input.hasMinors);
  const guardian = getPrimaryGuardian(input);
  const remainder = normalizeName(input.metadata?.remainderClause);
  const assets = input.assets ?? [];
  const beneficiaries = (input.beneficiaries ?? []).filter((nameItem) => nameItem.trim());
  const allocations = input.metadata?.assetAllocations ?? [];

  if (!name || name.toLowerCase() === "unknown") {
    blockingIssues.push("Missing legal name: provide the full name of the testator before final draft generation.");
  }

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

  if (!beneficiaries.length) {
    warnings.push("Beneficiary details appear incomplete; confirm full legal names before signing.");
  }

  return { blockingIssues, warnings };
}

export function generateDraft(input: WillInput): string {
  const clauses = [
    "LAST WILL AND TESTAMENT",
    "",
    buildIdentityClause(input),
    "",
    buildFamilyContextClause(input),
    "",
    buildExecutorClause(input),
    "",
    buildGuardianClause(input),
    "",
    buildSpecificGiftsClause(input),
    "",
    buildResiduaryClause(input),
    "",
    buildDebtsAndExpensesClause(),
    "",
    buildSpecialWishesClause(input),
    "",
    buildAttestationGuidanceClause()
  ];

  return clauses.join("\n");
}
