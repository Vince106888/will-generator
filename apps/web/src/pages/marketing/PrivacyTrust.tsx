// Frame: Privacy + Trust (Scsqx)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { FooterBase } from "../../components/layout/FooterBase";
import { HelperCallout, SectionCard } from "../../components/ui/PencilPanels";

export default function PrivacyTrust() {
  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start drafting</span>
          </>
        ),
        ctaPath: "/entry-choice"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Privacy and trust
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Your will is deeply personal. We protect your information with
              strong encryption, minimal data collection, and clear control over
              deletion.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <HelperCallout
              title="End-to-end encrypted"
              body="Your drafting data is encrypted in transit and at rest. Only you can access your draft."
            />
            <HelperCallout
              title="Minimal data collection"
              body="We only ask for details required to draft your will. Optional fields are clearly marked."
            />
            <HelperCallout
              title="Control and deletion"
              body="You can delete your draft and data at any time before signing."
            />
          </div>

          <SectionCard title="Legal safeguards" subtitle="How we handle confidentiality and access.">
            <div className="space-y-2 text-[13px] text-ink">
              <p>&bull; Data is stored in secure Kenyan-compliant infrastructure</p>
              <p>&bull; Advocate review is opt-in and requires your consent</p>
              <p>&bull; We never sell or share personal data</p>
            </div>
          </SectionCard>

          <FooterBase />
        </div>
      </Container>
    </WorkspaceShell>
  );
}
