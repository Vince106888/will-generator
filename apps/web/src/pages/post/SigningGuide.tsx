// Frame: Signing Instructions (JXSDZ)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { SectionCard, WarningBanner } from "../../components/ui/PencilPanels";
import { navigate } from "../../lib/navigation";

export default function SigningGuide() {
  return (
    <WorkspaceShell
      nav={{
        ctaLabel: "Finish",
        ctaPath: "/",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Signing instructions
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Your will becomes legally effective only after proper signing and
              witnessing. Follow these steps carefully.
            </p>
          </div>

          <div className="space-y-3">
            <SectionCard
              title="1. Print the will"
              subtitle="Signatures must be on a physical copy."
            >
              <div className="space-y-1.5 text-[13px] text-muted">
                <p>• Use a clean, readable printout</p>
                <p>• Keep all pages together</p>
              </div>
            </SectionCard>

            <SectionCard
              title="2. Gather two witnesses"
              subtitle="Witnesses must be independent adults."
            >
              <div className="space-y-1.5 text-[13px]">
                <p className="text-warning">• A beneficiary cannot be a witness</p>
                <p className="text-muted">• Witnesses should see you sign</p>
                <p className="text-muted">• They must sign in your presence</p>
              </div>
            </SectionCard>

            <SectionCard
              title="3. Sign and date"
              subtitle="Write the date and place clearly."
            >
              <div className="space-y-1.5 text-[13px] text-muted">
                <p>• Use your full legal signature</p>
                <p>• Record the location (town/county)</p>
                <p>• Witnesses sign immediately after</p>
              </div>
            </SectionCard>

            <SectionCard
              title="4. Store safely"
              subtitle="Let your executor know where the will is kept."
            >
              <div className="space-y-1.5 text-[13px] text-muted">
                <p>• Keep a copy in a secure location</p>
                <p>• Tell your executor how to access it</p>
                <p>• Consider a certified copy if needed</p>
              </div>
            </SectionCard>
          </div>

          <WarningBanner
            title="Witness rule reminder"
            body="A beneficiary cannot be a witness. If they sign as a witness, they may lose their entitlement."
          />

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="px-5 py-3 text-[13px]"
              onClick={() => navigate("/drafting/export-options")}
            >
              Back to export
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="px-5 py-3 text-[13px]"
              onClick={() => navigate("/")}
            >
              Finish and save
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
