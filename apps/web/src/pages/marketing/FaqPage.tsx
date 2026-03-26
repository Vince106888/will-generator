// Frame: FAQ Page (puMDs)
import { Container } from "../../components/layout/Container";
import { MarketingShell } from "../../components/layout/MarketingShell";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";

const faqs = [
  {
    q: "Is a digital draft legally valid in Kenya?",
    a: "A will becomes legally valid only after proper signing and witnessing. The draft helps you prepare the wording and structure."
  },
  {
    q: "Do I need a lawyer to use Esheria Wills?",
    a: "No. The guided flow is designed for everyday families. You can request an advocate review if your case is complex."
  },
  {
    q: "What if I already have a will?",
    a: "We can help you draft a codicil (an amendment) or replace it with a new will. We explain both paths clearly."
  },
  {
    q: "Can I update my will later?",
    a: "Yes. You can return to update your draft or create a new version. We recommend destroying older signed copies."
  },
  {
    q: "Who should be a witness?",
    a: "Witnesses must be adults and cannot be beneficiaries. They should be present together when you sign."
  },
  {
    q: "What is an executor?",
    a: "An executor carries out your wishes: they locate the signed will, settle debts, and distribute assets."
  },
  {
    q: "How is my data protected?",
    a: "Your information is encrypted and stored only to support your draft. You remain in control of what you share."
  },
  {
    q: "Can I name guardians for minors?",
    a: "Yes. If you have minor children, you can name a guardian and a backup guardian."
  },
  {
    q: "What if my estate is complex?",
    a: "If you have trusts, multiple households, or large business interests, request an advocate review for extra support."
  }
];

export default function FaqPage() {
  return (
    <MarketingShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="Support"
          title="Frequently asked questions"
          description="Clear answers to common questions about drafting, signing, and keeping your will up to date."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q} size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">{faq.q}</p>
                <p className="text-xs text-muted">{faq.a}</p>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Need more help?</p>
              <p className="text-xs text-muted">
                If you have specific questions, you can request advocate review or start drafting to see guidance tailored
                to your situation.
              </p>
              <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
                Start drafting
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/advocate-review")}>
                Request advocate review
              </Button>
            </Card>
            <TrustPanel
              title="We explain every step"
              items={[
                "Legal terms are defined in plain English.",
                "You can pause and return later without losing progress.",
                "We guide you through signing and witnessing."
              ]}
            />
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
