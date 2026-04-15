import { useEffect, useMemo } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { WarningBanner } from "../../components/ui/PencilPanels";
import { loadDraftingData, useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { api } from "../../lib/api";

export default function AiExtractionSummary() {
  const { data, update, session, setData } = useDraftingData();
  const candidates = data.aiDraftSession.extractionCandidates;
  const abstained = Boolean(data.aiDraftSession.abstained);
  const lastError = data.aiDraftSession.lastError;
  const extracted = candidates?.extracted;
  const confidence = candidates?.confidence;
  const hasCandidates = Boolean(candidates?.summary || extracted);
  const hasGaps =
    (candidates?.missingInformation?.length ?? 0) > 0 || (candidates?.ambiguityWarnings?.length ?? 0) > 0;

  const personalDetailsLines = useMemo(() => {
    if (!extracted?.personalDetails) return [];
    const lines: string[] = [];
    if (extracted.personalDetails.fullName) lines.push(`Full name: ${extracted.personalDetails.fullName}`);
    if (extracted.personalDetails.maritalStatus) {
      lines.push(`Marital status: ${extracted.personalDetails.maritalStatus}`);
    }
    if (extracted.personalDetails.spouseName) lines.push(`Spouse: ${extracted.personalDetails.spouseName}`);
    if (extracted.personalDetails.domicile) lines.push(`Domicile: ${extracted.personalDetails.domicile}`);
    if (extracted.personalDetails.notes) lines.push(`Notes: ${extracted.personalDetails.notes}`);
    return lines;
  }, [extracted?.personalDetails]);

  const familyLines = useMemo(() => {
    if (!extracted?.familyStructure) return [];
    const lines: string[] = [];
    if (typeof extracted.familyStructure.hasMinors === "boolean") {
      lines.push(`Has minors: ${extracted.familyStructure.hasMinors ? "Yes" : "No"}`);
    }
    const children = extracted.familyStructure.children ?? [];
    const dependants = extracted.familyStructure.dependants ?? [];
    if (children.length) {
      lines.push(`Children: ${children.map((child) => child.name).filter(Boolean).join(", ")}`);
    }
    if (dependants.length) {
      lines.push(`Dependants: ${dependants.map((dep) => dep.name).filter(Boolean).join(", ")}`);
    }
    return lines;
  }, [extracted?.familyStructure]);

  useEffect(() => {
    if (candidates?.summary) return;
    const stored = loadDraftingData();
    if (stored.aiDraftSession?.extractionCandidates?.summary) {
      setData(stored);
    }
  }, [candidates?.summary, setData]);

  const applyCandidates = async () => {
    if (!extracted) return;
    const mappedAssets = (extracted?.assets ?? []).map((asset) => ({
      label: asset.label,
      location: asset.details ?? "",
      notes: ""
    }));
    const mappedBeneficiaries = (extracted?.beneficiaries ?? []).map((beneficiary) => ({
      name: beneficiary.name,
      relationship: beneficiary.relationship ?? "",
      phone: "",
      idType: "",
      share: beneficiary.share ?? ""
    }));
    const mappedExecutors = (extracted?.executors ?? []).slice(0, 2).map((executor) => ({
      name: executor.name,
      relationship: executor.relationship ?? "",
      phone: ""
    }));
    const normalizedExecutors = [
      mappedExecutors[0] ?? { name: "", relationship: "", phone: "" },
      mappedExecutors[1] ?? { name: "", relationship: "", phone: "" }
    ];
    const mappedGuardians = (extracted?.guardians ?? []).slice(0, 2).map((guardian) => ({
      name: guardian.name,
      relationship: guardian.relationship ?? "",
      phone: "",
      location: "",
      notes: ""
    }));
    const normalizedGuardians = [
      mappedGuardians[0] ?? { name: "", relationship: "", phone: "", location: "", notes: "" },
      mappedGuardians[1] ?? { name: "", relationship: "", phone: "", location: "", notes: "" }
    ];
    const mappedDependants = [
      ...(extracted.familyStructure.children ?? []),
      ...(extracted.familyStructure.dependants ?? [])
    ]
      .map((person) => ({
        name: person.name ?? "",
        relationship: person.relationship ?? "",
        age: person.age ?? "",
        location: ""
      }))
      .filter((person) => person.name.trim());
    const nextDependants =
      mappedDependants.length > 0
        ? mappedDependants
        : data.dependants.length
          ? data.dependants
          : [{ name: "", relationship: "", age: "", location: "" }];

    update({
      assets: mappedAssets.length ? mappedAssets : data.assets,
      beneficiaries: mappedBeneficiaries.length ? mappedBeneficiaries : data.beneficiaries,
      executors: normalizedExecutors,
      guardians: normalizedGuardians,
      dependants: nextDependants,
      hasMinors:
        typeof extracted.familyStructure.hasMinors === "boolean"
          ? extracted.familyStructure.hasMinors
          : data.hasMinors,
      maritalStatus: extracted.personalDetails.maritalStatus ?? data.maritalStatus,
      spouseName: extracted.personalDetails.spouseName ?? data.spouseName,
      specialWishes:
        extracted?.specialWishes?.map((item) => item.text).join("\n") || data.specialWishes,
      residuaryWishes: extracted?.residue?.notes ?? data.residuaryWishes,
      aiDraftSession: {
        ...data.aiDraftSession,
        abstained: false
      }
    });

    if (session && data.aiDraftSession.interactionId) {
      try {
        await api.patch(
          `/api/v1/ai/interactions/${data.aiDraftSession.interactionId}/decision`,
          { status: "ACCEPTED", userDecision: "User confirmed extraction candidates" },
          { headers: { "x-draft-token": session.resumeToken } }
        );
      } catch {
        // no-op: keep UI responsive
      }
    }

    navigate("/drafting/ai/corrections");
  };

  return (
    <WorkspaceShell nav={{ ctaLabel: "Back", ctaMode: "ai", ctaPath: "/drafting/ai/input" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting - Step 4 of 6: Candidate summary
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Structured extraction candidates</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Review AI candidates. Confirm or edit before applying to your structured drafting data.
            </p>
            <AiStepNav currentPath="/drafting/ai/summary" />
          </div>

          {lastError ? (
            <WarningBanner title="AI processing failed" body={lastError} />
          ) : null}
          {abstained ? (
            <WarningBanner
              title="AI abstained"
              body={
                data.aiDraftSession.uncertainty ||
                "AI could not safely produce reliable extraction suggestions. Continue with manual structured drafting."
              }
            />
          ) : null}
          {hasGaps && !abstained ? (
            <WarningBanner
              title="Extraction incomplete"
              body="Some details are missing or ambiguous. Review the gaps below and confirm or edit before applying."
            />
          ) : null}
          {!hasCandidates ? (
            <WarningBanner
              title="No extraction available"
              body="We do not have extraction candidates yet. Return to the AI notes step and run analysis."
            />
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Extraction summary</p>
              {candidates?.summary ? (
                <p className="text-[13px] text-ink">{candidates.summary}</p>
              ) : (
                <p className="text-[13px] text-muted">No summary provided.</p>
              )}
              <p className="text-[12px] text-muted">
                Confidence: {typeof confidence === "number" ? `${Math.round(confidence * 100)}%` : "n/a"}
              </p>
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Confidence & uncertainty</p>
              {data.aiDraftSession.uncertainty ? (
                <p className="text-[13px] text-ink">{data.aiDraftSession.uncertainty}</p>
              ) : (
                <p className="text-[13px] text-muted">
                  We display gaps and ambiguity below. Confirm every candidate before it applies to your structured data.
                </p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Extracted personal details</p>
              {personalDetailsLines.length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {personalDetailsLines.map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No personal details extracted.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Family structure</p>
              {familyLines.length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {familyLines.map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No family structure extracted.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Missing information</p>
              {(candidates?.missingInformation ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.missingInformation ?? []).map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No missing details flagged.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Ambiguity warnings</p>
              {(candidates?.ambiguityWarnings ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.ambiguityWarnings ?? []).map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No ambiguity warnings flagged.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Complexity signals</p>
              {(candidates?.complexitySignals ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.complexitySignals ?? []).map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No complexity signals flagged.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Assets candidates</p>
              {(extracted?.assets ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(extracted?.assets ?? []).map((asset, index) => (
                    <p key={`${asset.label}-${index}`}>
                      &bull; {asset.label} {asset.confidence ? `(conf: ${Math.round(asset.confidence * 100)}%)` : ""}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No assets suggested.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Beneficiary candidates</p>
              {(extracted?.beneficiaries ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(extracted?.beneficiaries ?? []).map((beneficiary, index) => (
                    <p key={`${beneficiary.name}-${index}`}>
                      &bull; {beneficiary.name} {beneficiary.relationship ? `(${beneficiary.relationship})` : ""}
                      {beneficiary.confidence ? ` (conf: ${Math.round(beneficiary.confidence * 100)}%)` : ""}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No beneficiaries suggested.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Executor candidates</p>
              {(extracted?.executors ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(extracted?.executors ?? []).map((executor, index) => (
                    <p key={`${executor.name}-${index}`}>
                      &bull; {executor.name} {executor.relationship ? `(${executor.relationship})` : ""}
                      {executor.confidence ? ` (conf: ${Math.round(executor.confidence * 100)}%)` : ""}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No executors suggested.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Guardian and wishes candidates</p>
              <div className="space-y-2 text-[13px] text-ink">
                {(extracted?.guardians ?? []).map((guardian, index) => (
                  <p key={`${guardian.name}-${index}`}>
                    &bull; Guardian: {guardian.name} {guardian.relationship ? `(${guardian.relationship})` : ""}
                  </p>
                ))}
                {(extracted?.specialWishes ?? []).map((wish, index) => (
                  <p key={`${wish.text}-${index}`}>&bull; Wish: {wish.text}</p>
                ))}
                {!((extracted?.guardians ?? []).length || (extracted?.specialWishes ?? []).length) ? (
                  <p className="text-muted">No guardian or wishes suggestions.</p>
                ) : null}
              </div>
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Residue and remainder</p>
              {extracted?.residue?.notes ? (
                <p className="text-[13px] text-ink">{extracted.residue.notes}</p>
              ) : (
                <p className="text-[13px] text-muted">No remainder clause notes suggested.</p>
              )}
              {(extracted?.residue?.beneficiaries ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(extracted?.residue?.beneficiaries ?? []).map((beneficiary, index) => (
                    <p key={`${beneficiary.name}-${index}`}>
                      &bull; {beneficiary.name} {beneficiary.share ? `(${beneficiary.share})` : ""}
                    </p>
                  ))}
                </div>
              ) : null}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Suggested next questions</p>
              {(candidates?.recommendedNextQuestions ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.recommendedNextQuestions ?? []).map((item) => (
                    <p key={item}>&bull; {item}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No follow-up questions suggested.</p>
              )}
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={applyCandidates} disabled={abstained || !extracted}>
              Confirm and apply candidates
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/assets")}>
              Skip AI and edit manually
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/ai/input")}>
              Back to AI notes
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
