// file: apps/api/src/engines/draftEngine.ts
import { DraftConsistencyReport, PersonRole, WillInput } from "../types";

function normalizeName(value: string | undefined | null) {
  return String(value ?? "").trim();
}

function formatBullets(lines: string[]) {
  return lines.filter(Boolean).map((line) => `- ${line}`);
}

function sentenceCase(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
}

function joinNatural(values: string[]) {
  if (values.length <= 1) return values[0] ?? "";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
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
  const intro =
    name === "[TESTATOR NAME REQUIRED]"
      ? "I, [TESTATOR NAME REQUIRED], make this draft as my intended Last Will and Testament."
      : `I, ${name}, make this draft as my Last Will and Testament under the laws of ${country}.`;

  return [
    "SECTION 1: DECLARATION AND REVOCATION",
    intro,
    "I confirm that I am acting voluntarily and with the intention that this document should govern the administration and distribution of my estate.",
    "I revoke all earlier wills and codicils made by me, except to the extent any later properly executed document changes this draft."
  ].join("\n");
}

function buildFamilyContextClause(input: WillInput): string {
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const minorChildren = input.metadata?.minorChildren ?? [];

  const lines = [
    beneficiaries.length
      ? `The following beneficiaries are currently named: ${joinNatural(beneficiaries)}.`
      : "Beneficiary names are still being confirmed and should be completed before execution.",
    input.hasMinors
      ? minorChildren.length
        ? `Minor children currently identified: ${joinNatural(minorChildren)}.`
        : "This draft indicates minor children, but their names should be confirmed."
      : "No minor children are currently recorded in this draft.",
    input.multipleHouseholds
      ? "A multiple-household context is noted; allocations should be reviewed carefully to reduce ambiguity."
      : ""
  ].filter(Boolean);

  return ["SECTION 2: FAMILY AND BENEFICIARY CONTEXT", ...lines].join("\n");
}

function buildExecutorClause(input: WillInput): string {
  const primaryExecutor = getPrimaryExecutor(input);
  const alternateExecutor = getAlternateExecutor(input);
  const metadataExecutors = input.metadata?.executors ?? [];

  return [
    "SECTION 3: APPOINTMENT OF PERSONAL REPRESENTATIVES",
    primaryExecutor
      ? `I appoint ${describeRole(metadataExecutors[0], primaryExecutor)} as Executor to administer my estate and carry out this draft.`
      : "An Executor has not yet been clearly identified. This must be completed before signing.",
    alternateExecutor
      ? `If the primary Executor is unwilling or unable to act, I appoint ${describeRole(
          metadataExecutors[1],
          alternateExecutor
        )} as alternate Executor.`
      : "No alternate Executor is currently listed in this draft.",
    "The Executor should settle enforceable liabilities, preserve estate assets, and distribute the estate in accordance with this document and applicable law."
  ].join("\n");
}

function buildGuardianClause(input: WillInput): string {
  if (!input.hasMinors) {
    return [
      "SECTION 4: GUARDIANSHIP FOR MINOR CHILDREN",
      "No active guardianship appointment is included because minor children are not currently indicated."
    ].join("\n");
  }

  const guardian = getPrimaryGuardian(input);
  const alternateGuardian = getAlternateGuardian(input);
  const guardians = input.metadata?.guardians ?? [];
  const minors = input.metadata?.minorChildren?.filter((child) => child.trim()) ?? [];
  const minorsText = minors.length ? `for the following minors: ${minors.join(", ")}` : "for my minor children";

  return [
    "SECTION 4: GUARDIANSHIP FOR MINOR CHILDREN",
    guardian
      ? `If at my death any of my children are minors, I appoint ${describeRole(
          guardians[0],
          guardian
        )} to act as guardian ${minorsText}.`
      : "Minor children are indicated, but no guardian has yet been clearly appointed.",
    alternateGuardian
      ? `If the primary guardian cannot act, I appoint ${describeRole(
          guardians[1],
          alternateGuardian
        )} as alternate guardian.`
      : "No alternate guardian is currently listed."
  ].join("\n");
}

function buildSpecificGiftsClause(input: WillInput): string {
  const allocations = input.metadata?.assetAllocations ?? [];
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const assetDetails = input.metadata?.assetDetails ?? [];

  if (!allocations.length) {
    const fallbackLines = (input.assets ?? []).map(
      (asset) => `- ${sentenceCase(asset)}: to be administered by the Executor for distribution based on the confirmed beneficiary instructions.`
    );
    const assetDetailLines = assetDetails
      .map((asset) => {
        const details = [asset.label, asset.details].filter(Boolean).join(" - ");
        return details ? `- ${details}` : "";
      })
      .filter(Boolean);

    const lines = fallbackLines.length ? fallbackLines : assetDetailLines;

    return [
      "SECTION 5: GIFTS AND DISTRIBUTION",
      lines.length
        ? lines.join("\n")
        : "- No specific gifts are currently listed. Add assets or allocations if you want detailed distribution instructions.",
      beneficiaries.length
        ? `Named beneficiaries currently captured: ${joinNatural(beneficiaries)}.`
        : "Beneficiary details should be completed so distribution directions are clear."
    ].join("\n");
  }

  const lines = allocations.map((allocation) => {
    const assetLabel = allocation.assetLabel?.trim() || "Unlabelled asset";
    if (!allocation.allocations.length) {
      return `- ${assetLabel}: allocation is not yet specified and requires confirmation.`;
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

  return ["SECTION 5: GIFTS AND DISTRIBUTION", ...lines].join("\n");
}

function buildResiduaryClause(input: WillInput): string {
  const remainderClause = normalizeName(input.metadata?.remainderClause);
  const beneficiaries = (input.beneficiaries ?? []).filter((item) => item.trim());
  const fallback =
    beneficiaries.length > 0
      ? `I direct that the residue of my estate pass to ${joinNatural(beneficiaries)} in equal shares, subject to survivorship.`
      : "If no clear residuary direction is provided, the residue should be administered by the Executor in accordance with applicable succession law.";

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
    "SECTION 7: DEBTS, TAXES, AND ESTATE EXPENSES",
    "I direct my Executor to settle enforceable debts, taxes, and reasonable funeral and estate administration expenses before final distribution of the estate."
  ].join("\n");
}

function buildSpecialWishesClause(input: WillInput): string {
  const funeral = normalizeName(input.instructions?.funeralWishes);
  const notes = normalizeName(input.instructions?.notes);
  const special = input.metadata?.specialWishes?.filter((item) => item.trim()) ?? [];
  const specialCombined = [...special, notes].filter(Boolean);

  return [
    "SECTION 8: PERSONAL WISHES (NON-BINDING GUIDANCE)",
    "The following statements are guidance for my family and Executor. They are generally non-binding unless applicable law provides otherwise:",
    ...formatBullets([
      funeral ? `Funeral wishes: ${funeral}` : "No funeral wishes are currently recorded.",
      specialCombined.length
        ? `Additional wishes and notes: ${specialCombined.join(" | ")}`
        : "No additional personal wishes are currently recorded."
    ])
  ].join("\n");
}

function buildAttestationGuidanceClause(): string {
  return [
    "APPENDIX A: EXECUTION GUIDANCE (KENYA)",
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
    "DRAFT WILL DOCUMENT",
    "Last Will and Testament - Draft for Review",
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
