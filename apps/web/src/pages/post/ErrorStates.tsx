import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";

export default function ErrorStates() {
  return (
    <div className="pb-24 pt-12">
      <Container className="max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Error and empty states</p>
          <p className="text-[15px] text-muted">
            Examples of the humane error and empty messaging used across the drafting experience.
          </p>
        </div>

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
            <p className="text-xs text-muted">
              Please sign in again to continue your draft securely.
            </p>
          </Card>
          <Card size="md" variant="warning" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Missing required fields</p>
            <p className="text-xs text-muted">
              Please complete the highlighted fields to continue.
            </p>
          </Card>
          <Card size="md" variant="error" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Draft generation failed</p>
            <p className="text-xs text-muted">
              We couldn't generate your draft. Try again or contact support.
            </p>
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
          <Card size="md" variant="secondary" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Example empty helper</p>
            <p className="text-xs text-muted">
              We will highlight missing details and explain why we ask. You can skip optional items.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
