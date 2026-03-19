import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { navigate } from "../../lib/navigation";

export default function SigningGuide() {
  return (
    <div className="pb-24 pt-12">
      <Container>
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Signing instructions</p>
          <p className="text-[15px] text-muted">
            Your draft is not legally valid until it is properly signed and witnessed. Follow these steps carefully.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {[
              {
                title: "1. Print the draft",
                body: "Use a clear printed copy for signing."
              },
              {
                title: "2. Sign in front of two witnesses",
                body: "Witnesses must be adults and not beneficiaries."
              },
              {
                title: "3. Store safely",
                body: "Keep the signed copy somewhere secure and inform your executor."
              }
            ].map((item) => (
              <Card key={item.title} size="md" className="space-y-2">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
          <Card size="md" variant="warning" className="space-y-2">
            <p className="text-sm font-semibold text-ink">Who cannot be a witness</p>
            <p className="text-xs text-muted">
              Any beneficiary or spouse of a beneficiary should not act as a witness.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate("/")}>
              Finish
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
