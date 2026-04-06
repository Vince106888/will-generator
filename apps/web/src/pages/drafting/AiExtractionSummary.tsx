import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { WarningBanner } from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { api } from "../../lib/api";

export default function AiExtractionSummary() {
  const { data, update, session } = useDraftingData();
  const candidates = data.aiDraftSession.extractionCandidates;
  const abstained = Boolean(data.aiDraftSession.abstained);

  const applyCandidates = async () => {
    const mappedAssets = (candidates?.assets ?? []).map((asset) => ({
      label: asset.label,
      location: asset.details ?? "",
      notes: ""
    }));
    const mappedBeneficiaries = (candidates?.beneficiaries ?? []).map((beneficiary) => ({
      name: beneficiary.name,
      relationship: beneficiary.relationship ?? "",
      phone: "",
      idType: "",
      share: ""
    }));
    const mappedExecutors = (candidates?.executors ?? []).slice(0, 2).map((executor) => ({
      name: executor.name,
      relationship: executor.relationship ?? "",
      phone: ""
    }));
    const normalizedExecutors = [
      mappedExecutors[0] ?? { name: "", relationship: "", phone: "" },
      mappedExecutors[1] ?? { name: "", relationship: "", phone: "" }
    ];
    const mappedGuardians = (candidates?.guardians ?? []).slice(0, 2).map((guardian) => ({
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

    update({
      assets: mappedAssets.length ? mappedAssets : data.assets,
      beneficiaries: mappedBeneficiaries.length ? mappedBeneficiaries : data.beneficiaries,
      executors: normalizedExecutors,
      guardians: normalizedGuardians,
      specialWishes:
        candidates?.specialWishes?.map((item) => item.text).join("\n") || data.specialWishes,
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
              AI drafting — Step 4 of 6: Candidate summary
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Structured extraction candidates</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Review AI candidates. Confirm or edit before applying to your structured drafting data.
            </p>
            <AiStepNav currentPath="/drafting/ai/summary" />
          </div>

          {abstained ? (
            <WarningBanner
              title="AI abstained"
              body={
                data.aiDraftSession.uncertainty ||
                "AI could not safely produce reliable extraction suggestions. Continue with manual structured drafting."
              }
            />
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Assets candidates</p>
              {(candidates?.assets ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.assets ?? []).map((asset, index) => (
                    <p key={`${asset.label}-${index}`}>
                      • {asset.label} {asset.confidence ? `(conf: ${Math.round(asset.confidence * 100)}%)` : ""}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No assets suggested.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Beneficiary candidates</p>
              {(candidates?.beneficiaries ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.beneficiaries ?? []).map((beneficiary, index) => (
                    <p key={`${beneficiary.name}-${index}`}>
                      • {beneficiary.name} {beneficiary.relationship ? `(${beneficiary.relationship})` : ""}
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
              {(candidates?.executors ?? []).length ? (
                <div className="space-y-2 text-[13px] text-ink">
                  {(candidates?.executors ?? []).map((executor, index) => (
                    <p key={`${executor.name}-${index}`}>
                      • {executor.name} {executor.relationship ? `(${executor.relationship})` : ""}
                      {executor.confidence ? ` (conf: ${Math.round(executor.confidence * 100)}%)` : ""}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted">No executors suggested.</p>
              )}
            </Card>

            <Card size="lg" className="space-y-3">
              <p className="font-display text-xl font-semibold text-ink">Guardian / wishes candidates</p>
              <div className="space-y-2 text-[13px] text-ink">
                {(candidates?.guardians ?? []).map((guardian, index) => (
                  <p key={`${guardian.name}-${index}`}>
                    • Guardian: {guardian.name} {guardian.relationship ? `(${guardian.relationship})` : ""}
                  </p>
                ))}
                {(candidates?.specialWishes ?? []).map((wish, index) => (
                  <p key={`${wish.text}-${index}`}>• Wish: {wish.text}</p>
                ))}
                {!((candidates?.guardians ?? []).length || (candidates?.specialWishes ?? []).length) ? (
                  <p className="text-muted">No guardian/wishes suggestions.</p>
                ) : null}
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={applyCandidates} disabled={abstained}>
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