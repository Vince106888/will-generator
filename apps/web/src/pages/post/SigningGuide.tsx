import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";

const steps = [
  {
    title: "1. Print the draft",
    body: "Use a clear printed copy. Do not sign electronically unless advised by an advocate."
  },
  {
    title: "2. Sign in front of two witnesses",
    body: "Witnesses must be adults, present at the same time, and not beneficiaries."
  },
  {
    title: "3. Witnesses sign and write their details",
    body: "They should add full names, ID numbers, and contact details clearly."
  },
  {
    title: "4. Store the signed copy safely",
    body: "Keep it in a secure place and let your executor know where to find it."
  }
];

export default function SigningGuide() {
  return (
    <div className="pb-24 pt-12">
      <Container className="max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Signing instructions</p>
          <p className="max-w-[900px] text-[15px] text-muted">
            Your draft is not legally valid until it is properly signed and witnessed. Follow these steps carefully and
            ask for help if anything feels unclear.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {steps.map((item) => (
              <Card key={item.title} size="md" className="space-y-2">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted">{item.body}</p>
              </Card>
            ))}
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-sm font-semibold text-ink">After signing</p>
              <p className="text-xs text-muted">
                Keep copies in separate safe locations. If you update your will later, destroy older signed copies.
              </p>
            </Card>
          </div>
          <div className="space-y-4">
            <Callout tone="warning">
              A beneficiary cannot be a witness. If they sign as a witness, they may lose their entitlement.
            </Callout>
            <Card size="md" className="space-y-2">
              <p className="text-sm font-semibold text-ink">Need support?</p>
              <p className="text-xs text-muted">
                If your situation is complex, request an advocate review before signing.
              </p>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
                Request advocate review
              </Button>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-sm font-semibold text-ink">If you update the draft</p>
              <p className="text-xs text-muted">
                Re-print the latest version and re-sign with witnesses. Older signed copies should be destroyed.
              </p>
            </Card>
            <Button variant="primary" size="sm" onClick={() => navigate("/")}>
              Finish
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
