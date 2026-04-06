import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function AiProcessing() {
  const { data } = useDraftingData();
  const hasCandidates = Boolean(data.aiDraftSession.extractionCandidates);
  const abstained = Boolean(data.aiDraftSession.abstained);

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save", ctaMode: "ai", ctaPath: "/drafting/ai/summary" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — Step 3 of 6: Processing status
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Processing status</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              This step shows whether AI extraction produced schema-valid suggestions or abstained.
            </p>
            <AiStepNav currentPath="/drafting/ai/processing" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <p className="font-display text-xl font-semibold text-ink">Current state</p>
                <p className="text-[13px] text-muted">
                  {abstained
                    ? "AI abstained due to confidence/safety checks. Continue manually or improve input clarity."
                    : hasCandidates
                      ? "AI suggestions are available for your review and confirmation."
                      : "No AI suggestions yet. Submit notes in the previous step."}
                </p>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={() => navigate("/drafting/ai/summary")}>Go to extraction summary</Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai/input")}>Back to AI notes</Button>
              </div>
            </div>

            <div className="space-y-4">
              <HelperCallout
                title="No hidden demo fallback"
                body="If AI abstains or fails schema validation, the UI explicitly says so and points you to manual structured entry."
              />
              <HelperCallout
                title="Deterministic legal backbone remains primary"
                body="Only confirmed structured data is used in final deterministic will generation."
              />
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}