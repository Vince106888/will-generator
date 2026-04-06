import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function AiCorrections() {
  const { data } = useDraftingData();
  const confidence = data.aiDraftSession.confidence || "n/a";

  return (
    <WorkspaceShell nav={{ ctaLabel: "Back", ctaMode: "ai", ctaPath: "/drafting/ai/summary" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — Step 5 of 6: Confirm edits
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Confirm structured edits</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Review structured fields one more time before deterministic draft generation.
            </p>
            <AiStepNav currentPath="/drafting/ai/corrections" />
          </div>

          <Card size="lg" className="space-y-3">
            <p className="font-display text-xl font-semibold text-ink">Current AI assist status</p>
            <p className="text-[13px] text-muted">Latest extraction confidence: {confidence}</p>
            <p className="text-[13px] text-muted">
              Final will text is never generated directly by AI. It is assembled deterministically from your confirmed fields.
            </p>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={() => navigate("/drafting/ai/review")}>
              Continue to review
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/assets")}>
              Edit structured fields manually
            </Button>
          </div>

          <HelperCallout
            title="Uncertainty is always visible"
            body="If AI abstains or confidence is low, continue with manual structured flow. No hidden auto-fill is applied."
          />
        </div>
      </Container>
    </WorkspaceShell>
  );
}