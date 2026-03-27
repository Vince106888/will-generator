import { Container } from "../../components/layout/Container";
import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { navigate } from "../../lib/navigation";

export default function SaveContinue() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="pb-24 pt-12">
      <Container>
        <Card size="lg" className="space-y-4">
          <div className="space-y-2">
            <p className="font-display text-2xl text-ink">Save and continue later? (Legacy)</p>
            <p className="text-sm text-muted">
              Legacy page retained for archive reference. Use the active drafting flow for save states.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-ink">Email for resume link</p>
            <Input placeholder="you@email.com" type="email" />
          </div>
          {saved && (
            <Card size="md" variant="success" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Saved</p>
              <p className="text-xs text-muted">
                Your progress is saved. We'll email a secure resume link.
              </p>
            </Card>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/review-result")}>
              Back to review
            </Button>
            <Button variant="primary" size="sm" onClick={() => setSaved(true)}>
              Save and send link
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
