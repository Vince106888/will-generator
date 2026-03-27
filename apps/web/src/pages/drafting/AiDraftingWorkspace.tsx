// Frame: AI Drafting Workspace (iVFMi)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { Badge } from "../../components/ui/Badge";
import { Textarea } from "../../components/ui/Textarea";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const messages = [
  {
    role: "AI",
    text: "Hello. Tell me what you want to happen to your assets and who should receive them. You can speak naturally - short notes are fine."
  },
  {
    role: "You",
    text: "I own a house in Kiambu, two rental plots in Machakos, and a Toyota. My wife should get the house, my son Brian should get the Toyota, and my daughter Nia should get the rental plots."
  },
  {
    role: "AI",
    text: "Thank you. Are there any other assets, dependants, or special instructions you want included?"
  }
];

const promptChips = [
  "Who should care for minors if needed?",
  "List any business interests or shares",
  "Any funeral or burial wishes?",
  "Share any debts or obligations"
];

export default function AiDraftingWorkspace() {
  const { data, update } = useDraftingData();
  const assetsCount = data.assets.filter((asset) => asset.location || asset.notes).length;
  const beneficiaryCount = data.beneficiaries.filter((beneficiary) => beneficiary.name).length;

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="AI Drafting"
          title="Draft with AI"
          description="Describe your wishes in plain language. We structure them, ask follow-ups, and summarize everything before it becomes a formal will draft."
          actions={
            <>
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                Switch to structured flow
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/ai-summary")}>
                Review summary
              </Button>
            </>
          }
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="space-y-6">
            <Card size="lg" className="space-y-6 p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-ink">Live drafting session</p>
                  <p className="text-xs text-muted">
                    We keep translating your notes into structured will sections as you speak.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="success">Autosave on</Badge>
                  <Badge tone="info">Kenya context</Badge>
                </div>
              </div>

              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-xl border px-4 py-3 ${
                      message.role === "AI" ? "border-border bg-secondary" : "border-border bg-card"
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {message.role}
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-ink">{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-paper p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-muted">Message</p>
                  <Badge tone="info">Autosave on</Badge>
                </div>
                <Textarea placeholder="Type or dictate your message" className="mt-3 min-h-[160px]" />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button variant="secondary" size="sm">Attach document</Button>
                  <Button variant="secondary" size="sm">Voice input</Button>
                  <div className="flex-1" />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      update({
                        aiDraftSession: {
                          ...data.aiDraftSession,
                          updatedAt: new Date().toISOString(),
                          confidence: "medium"
                        }
                      });
                      navigate("/drafting/ai-summary");
                    }}
                  >
                    Send message
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {promptChips.map((prompt) => (
                  <span
                    key={prompt}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-[12px] text-ink"
                  >
                    {prompt}
                  </span>
                ))}
              </div>
            </Card>

            <Callout tone="info">
              Consider listing assets, beneficiaries, dependants, executors, and any special wishes. If you have
              minors, mention who you trust as a guardian.
            </Callout>
          </div>

          <div className="space-y-5">
            <Card size="md" className="space-y-2">
              <Badge tone="info">Draft status</Badge>
              <p className="text-sm font-semibold text-ink">Capturing your wishes</p>
              <p className="text-xs text-muted">
                We update this as you share information. You can review everything before a draft is created.
              </p>
              <div className="grid gap-2 text-xs text-muted">
                <p>Assets mentioned: {assetsCount}</p>
                <p>Beneficiaries mentioned: {beneficiaryCount}</p>
              </div>
            </Card>

            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">How this becomes a legal will</p>
              <p className="text-xs text-muted">
                Your conversation is turned into a structured draft. It becomes legally valid only after proper
                signing and witnessing. We guide you through those steps later.
              </p>
            </Card>

            <TrustPanel
              title="Privacy and control"
              items={[
                "Sensitive details are encrypted and never sold.",
                "You choose when to export or share a draft.",
                "You can delete your drafting session at any time."
              ]}
            />

            <Card size="md" className="space-y-3">
              <p className="text-xs font-semibold text-ink">Next steps</p>
              <p className="text-xs text-muted">
                When you are ready, we will generate a structured summary for your review and edits.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-summary")}>
                  Generate summary
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                  Skip to structured flow
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
