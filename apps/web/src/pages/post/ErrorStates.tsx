// Frame: Error + Empty States (IRKLg)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import {
  EmptyStateCard,
  ErrorBanner,
  HelperCallout,
  SuccessPanel
} from "../../components/ui/PencilPanels";

export default function ErrorStates() {
  return (
    <WorkspaceShell
      nav={{
        ctaLabel: "Return",
        ctaOnClick: () => window.history.back()
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Recovery and empty states
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              We use gentle, clear messages when something goes wrong or
              information is missing. Every message explains what to do next.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <ErrorBanner
              title="We couldn't save your progress"
              body="Check your connection and try again. Your last saved version is still safe."
            />
            <EmptyStateCard
              title="No beneficiaries yet"
              body="Add the people you want to provide for, then return to assign assets."
            />
            <SuccessPanel
              title="Draft generated"
              body="Your will draft is ready. Review it carefully and follow the signing guide to make it legally valid."
            />
          </div>

          <HelperCallout
            title="If you leave required fields empty"
            body="We highlight what is missing, explain why it matters, and let you continue once you add the required details."
          />
        </div>
      </Container>
    </WorkspaceShell>
  );
}
