import { Container } from "../../components/layout/Container";
import { MarketingNav } from "../../components/layout/MarketingNav";
import { MarketingFooter } from "../../components/layout/MarketingFooter";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
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
    a: "We can help you draft a codicil (an amendment) so your documents stay consistent."
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
    q: "How is my data protected?",
    a: "Your information is encrypted and stored only to support your draft. You remain in control of what you share."
  }
];

export default function FaqPage() {
  return (
    <div className="bg-paper">
      <MarketingNav />
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Frequently asked questions</p>
          <p className="max-w-[880px] text-[15px] text-muted">
            Clear answers to common questions about drafting, signing, and keeping your will up to date.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q} size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">{faq.q}</p>
                <p className="text-xs text-muted">{faq.a}</p>
              </Card>
            ))}
          </div>
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
        </div>
      </Container>
      <MarketingFooter />
    </div>
  );
}
