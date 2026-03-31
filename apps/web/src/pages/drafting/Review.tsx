// Frame: Review + Result (0gbAz)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import {
  DocumentPreview,
  HelperCallout,
  ReviewChecklist,
  SectionCard,
  SuccessPanel,
  SummaryCard,
  WarningBanner
} from "../../components/ui/PencilPanels";
import { buildGeneratePayload, useDraftingData } from "../../lib/drafting";
import { api } from "../../lib/api";
import { STORAGE_KEYS } from "../../lib/storage";
import { navigate } from "../../lib/navigation";

export default function Review() {
  const { data } = useDraftingData();
  const assetLabels = data.assets
    .map((asset) => asset.label?.trim() || asset.location?.trim() || asset.notes?.trim() || "")
    .filter(Boolean);
  const beneficiaries = data.beneficiaries
    .map((beneficiary) => beneficiary.name?.trim() || "")
    .filter(Boolean);
  const executorName = data.executors?.[0]?.name?.trim() || "";
  const guardianName = data.guardians?.[0]?.name?.trim() || "";
  const hasRemainderClause = Boolean(data.remainderClause?.trim());
  const hasExecutor = Boolean(executorName);
  const hasBeneficiaries = beneficiaries.length > 0;

  const allocationLines = data.assetAllocations.flatMap((allocation) => {
    const assetLabel = allocation.assetLabel?.trim();
    if (!assetLabel) return [];
    const targets = allocation.allocations
      .map((target) => target.beneficiary?.trim() || "")
      .filter(Boolean);
    if (!targets.length) {
      return [`${assetLabel} → Not assigned (please confirm)`];
    }
    return [`${assetLabel} → ${targets.join(", ")}`];
  });

  const summaryLines =
    allocationLines.length > 0
      ? allocationLines
      : assetLabels.length > 0
        ? assetLabels.map((asset) => `${asset} → Not assigned (please confirm)`)
        : [
            "House in Kiambu → Wife",
            "Toyota Prado KDM 456A → Brian (son)",
            "Rental plots in Machakos → Nia (daughter)",
            "Remainder assets → Not specified (please confirm)"
          ];

  const missingItems = [
    !hasExecutor ? "assign an executor" : null,
    !hasBeneficiaries ? "add beneficiaries" : null,
    !hasRemainderClause ? "set a remainder clause" : null
  ].filter(Boolean) as string[];

  const handleGenerateDraft = async () => {
    try {
      const response = await api.post("/api/v1/wills/generate", buildGeneratePayload(data));
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEYS.willResult,
          JSON.stringify(response?.data ?? {})
        );
      }
    } finally {
      navigate("/drafting/review-result");
    }
  };

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export options</span>
          </>
        ),
        ctaPath: "/drafting/export-options",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              Step 8 of 8: Review your draft and results
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Review your draft and results
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Read through the summary below. We highlight anything missing or
              legally sensitive before you download or sign.
            </p>
          </div>

          <SuccessPanel
            title="Draft ready for review"
            body="We generated a full draft. Please confirm the items below and address any warnings before you sign."
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <SectionCard
                title="Your instructions summary"
                subtitle="Plain-English overview of what you asked for, with room to edit."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  {summaryLines.map((line) => {
                    const isWarning = line.includes("Not specified") || line.includes("Not assigned");
                    return (
                      <p key={line} className={isWarning ? "text-warning" : ""}>
                        &bull; {line}
                      </p>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard
                title="Executors and guardianship"
                subtitle="Key people who carry out your wishes and care for minors."
              >
                <div className="space-y-2 text-[13px]">
                  <p className={executorName ? "text-ink" : "text-warning"}>
                    &bull; Executor: {executorName || "Not provided"}
                  </p>
                  <p className="text-muted">&bull; Backup executor: Not provided</p>
                  <p className="text-muted">
                    &bull; Guardianship:{" "}
                    {data.hasMinors
                      ? guardianName || "Not provided"
                      : "Not applicable (no minor children listed)"}
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="Validity checklist"
                subtitle="We flag items that could affect legal validity or clarity."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; You must sign in front of two independent witnesses</p>
                  <p>&bull; A beneficiary cannot be a witness</p>
                  <p>&bull; Executor and beneficiary details should match their legal names</p>
                </div>
              </SectionCard>

              <WarningBanner
                title="Warnings to resolve"
                body={
                  missingItems.length
                    ? `Please ${missingItems.join(", ")} before signing.`
                    : "Review your draft and confirm details before signing."
                }
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="px-5 py-3 text-[13px]"
                  onClick={handleGenerateDraft}
                >
                  Generate draft
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-5 py-3 text-[13px]"
                  onClick={() =>
                    navigate(
                      data.draftingMode === "ai"
                        ? "/drafting/ai-summary"
                        : "/drafting/mapping"
                    )
                  }
                >
                  Edit details
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <SummaryCard
                title="Draft overview"
                lines={[
                  `Beneficiaries: ${data.beneficiaries.filter((b) => b.name).length || 3}`,
                  `Assets: ${data.assets.filter((a) => a.location || a.notes).length || 4}`,
                  `Executors: ${data.executors.filter((e) => e.name).length || 1}`
                ]}
              />
              <ReviewChecklist
                title="Completeness checks"
                items={[
                  { label: "Executor selected", tone: hasExecutor ? "success" : "warning" },
                  { label: "Remainder clause added", tone: hasRemainderClause ? "success" : "warning" }
                ]}
              />
              <DocumentPreview title="Draft preview" placeholder="Preview will draft" />
              <SectionCard
                title="After you sign"
                subtitle="Keep the will accessible and tell the right people."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Store the signed copy safely</p>
                  <p>&bull; Tell your executor where it is kept</p>
                  <p className="text-muted">&bull; Update this will if your circumstances change</p>
                </div>
              </SectionCard>
              <HelperCallout
                title="Need an advocate?"
                body="If your estate is complex, has foreign assets, or may be contested, request an advocate review before you sign."
              />
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
