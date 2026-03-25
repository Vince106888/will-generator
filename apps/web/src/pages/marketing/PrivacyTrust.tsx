import { Container } from "../../components/layout/Container";
import { MarketingNav } from "../../components/layout/MarketingNav";
import { MarketingFooter } from "../../components/layout/MarketingFooter";
import { Card } from "../../components/ui/Card";
import { Callout } from "../../components/ui/Callout";

const principles = [
  {
    title: "Private by default",
    body: "Your draft belongs to you. We store only what is needed to generate and save your will."
  },
  {
    title: "Clear consent",
    body: "You decide when to export, share, or request advocate review. We never share data without permission."
  },
  {
    title: "Secure storage",
    body: "Drafts are encrypted in transit and at rest. You can delete your data at any time."
  },
  {
    title: "Kenya-first compliance",
    body: "We follow Kenyan legal expectations for drafting and signing guidance."
  }
];

const safeguards = [
  "Role-based access to sensitive draft data",
  "Audit logging for advocate review requests",
  "Data retention controls for inactive drafts",
  "Exported drafts are watermarked as drafts until signed"
];

export default function PrivacyTrust() {
  return (
    <div className="bg-paper">
      <MarketingNav />
      <Container className="pb-24 pt-12 max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Privacy + trust</p>
          <p className="max-w-[880px] text-[15px] text-muted">
            We treat will information with care and explain how it is used. You stay in control, and you can request
            deletion whenever you want.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {principles.map((item) => (
              <Card key={item.title} size="lg" className="space-y-2">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">Legal safeguards</p>
              <ul className="list-disc space-y-2 pl-5 text-xs text-muted">
                {safeguards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Callout tone="info">
              We will always tell you how your data is used and provide a clear contact for privacy requests.
            </Callout>
          </div>
        </div>
      </Container>
      <MarketingFooter />
    </div>
  );
}
