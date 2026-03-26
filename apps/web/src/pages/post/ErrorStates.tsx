// Frame: Error + Empty States (IRKLg)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";

export default function ErrorStates() {
  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="System"
          title="Error and empty states"
          description="Examples of the humane error and empty messaging used across the drafting experience."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card size="md" variant="error" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Autosave failed</p>
            <p className="text-xs text-muted">
              Check your connection and try again. Your last saved version is safe.
            </p>
          </Card>
          <Card size="md" variant="warning" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Server error</p>
            <p className="text-xs text-muted">
              We couldn't load this section. Please refresh or try again later.
            </p>
          </Card>
          <Card size="md" variant="secondary" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Session expired</p>
            <p className="text-xs text-muted">Please sign in again to continue your draft securely.</p>
          </Card>
          <Card size="md" variant="warning" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Missing required fields</p>
            <p className="text-xs text-muted">Please complete the highlighted fields to continue.</p>
          </Card>
          <Card size="md" variant="error" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Draft generation failed</p>
            <p className="text-xs text-muted">We couldn't generate your draft. Try again or contact support.</p>
          </Card>
          <Card size="md" className="space-y-2">
            <p className="text-xs font-semibold text-ink">No assets added yet</p>
            <p className="text-xs text-muted">
              Add at least one asset so we can help allocate it to a beneficiary.
            </p>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Callout tone="info">
            Empty states explain what is missing and why it matters. We avoid blame and offer a clear next step.
          </Callout>
          <TrustPanel
            title="Supportive guidance"
            items={[
              "We explain why each detail is needed.",
              "You can skip optional items and return later.",
              "Errors always include a clear next action."
            ]}
          />
        </div>
      </Container>
    </WorkspaceShell>
  );
}
