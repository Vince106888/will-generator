import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { Badge } from "../../components/ui/Badge";
import { Textarea } from "../../components/ui/Textarea";
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

export default function AiDraftingWorkspace() {
  const { data, update } = useDraftingData();
  const assetsCount = data.assets.filter((asset) => asset.location || asset.notes).length;
  const beneficiaryCount = data.beneficiaries.filter((beneficiary) => beneficiary.name).length;

  return (
    <WorkspaceShell>
      <Container className="pb-24 pt-12 max-w-[1560px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Draft with AI</p>
          <p className="max-w-[960px] text-[15px] leading-7 text-muted">
            Describe your wishes in plain language. We will structure them, ask follow-ups, and summarize everything
            before it becomes a formal will draft.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <Card size="lg" className="space-y-5 p-8">
              <p className="text-sm font-semibold text-ink">Your conversation</p>
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
                <Textarea
                  placeholder="Type or dictate your message"
                  className="mt-3 min-h-[160px]"
                />
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
            </Card>

            <Callout tone="info">
              Consider listing assets, beneficiaries, dependants, executors, and any special wishes. Rough descriptions
              are fine.
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
              <p className="text-xs font-semibold text-ink">Your privacy</p>
              <p className="text-xs text-muted">
                Your inputs are encrypted and stored only to build your draft. You can delete your data at any time.
              </p>
            </Card>

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
