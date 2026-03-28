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
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function Review() {
  const { data } = useDraftingData();

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: "Export options",
        ctaPath: "/drafting/export-options",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
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
                  <p>• House in Kiambu → Wife</p>
                  <p>• Toyota Prado KDM 456A → Brian (son)</p>
                  <p>• Rental plots in Machakos → Nia (daughter)</p>
                  <p className="text-warning">
                    • Remainder assets → Not specified (please confirm)
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="Executors and guardianship"
                subtitle="Key people who carry out your wishes and care for minors."
              >
                <div className="space-y-2 text-[13px]">
                  <p className="text-ink">• Executor: Grace Wanjiku Mwangi</p>
                  <p className="text-muted">• Backup executor: Not provided</p>
                  <p className="text-muted">
                    • Guardianship: Not applicable (no minor children listed)
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="Validity checklist"
                subtitle="We flag items that could affect legal validity or clarity."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  <p>• You must sign in front of two independent witnesses</p>
                  <p>• A beneficiary cannot be a witness</p>
                  <p>• Executor and beneficiary details should match their legal names</p>
                </div>
              </SectionCard>

              <WarningBanner
                title="Warnings to resolve"
                body="Please assign a remainder clause (who receives assets not listed) and confirm any dependants before signing."
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="px-5 py-3 text-[13px]"
                  onClick={() => navigate("/drafting/export-options")}
                >
                  Go to export options
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
                  { label: "Personal details complete", tone: "success" },
                  { label: "Remainder clause missing", tone: "warning" }
                ]}
              />
              <DocumentPreview title="Draft preview" placeholder="Preview will draft" />
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
