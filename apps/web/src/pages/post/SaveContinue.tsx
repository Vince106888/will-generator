import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";

export default function SaveContinue() {
  return (
    <div className="pb-24 pt-12">
      <Container>
        <Card size="lg" className="space-y-4">
          <div className="space-y-2">
            <p className="font-display text-2xl text-ink">Save and continue later? (Legacy)</p>
            <p className="text-sm text-muted">
              Legacy page retained for archive reference. Resume links are managed from the
              active Review screen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/review-result")}>
              Go to active review
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
              Start a new draft
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
