// Frame: AI Drafting Workspace (iVFMi)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

const messages = [
  {
    role: "AI",
    text: "Hello. Tell me about your family, assets, and any wishes. You can speak naturally — short notes are fine."
  },
  {
    role: "You",
    text: "I have a house in Kiambu, two rental plots in Machakos, and a Toyota. My wife should receive the house, my son Brian the Toyota, and my daughter Nia the plots. I want my brother to be executor."
  },
  {
    role: "AI",
    text: "Thank you. Do you have any dependants, minor children, or special wishes? Who should be a backup executor?"
  }
];

const starterPrompts = [
  '“My sister should handle my bank accounts and pay school fees for the children.”',
  '“If both parents are gone, my aunt should be guardian for Brian and Nia.”',
  '“Any remaining property should be shared equally between my children.”'
];

export default function AiDraftingWorkspace() {
  const { data, update } = useDraftingData();
  const assetsCount = data.assets.filter((asset) => asset.location || asset.notes).length;
  const beneficiaryCount = data.beneficiaries.filter((beneficiary) => beneficiary.name).length;

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save draft", ctaMode: "ai", ctaPath: "/drafting/ai-summary" }}>
      <div className="pb-24 pt-10">
        <Container size="wide">
          <div className="space-y-3">
            <h1 className="font-display text-3xl text-ink sm:text-4xl">Draft with AI</h1>
            <p className="max-w-[760px] text-[16px] leading-7 text-muted">
              Share your wishes in plain language. We ask gentle follow‑ups and show a clear summary
              before any formal draft is created.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <Card size="lg" className="space-y-4 p-7">
                <p className="text-sm font-semibold text-ink">Your conversation</p>
                <div className="space-y-3">
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

                <div className="hidden space-y-2 lg:block">
                  <p className="text-[13px] font-semibold text-ink">Examples you can say</p>
                  <div className="space-y-2 text-[13px] leading-6 text-muted">
                    {starterPrompts.map((prompt) => (
                      <p key={prompt}>• {prompt}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[12px] font-semibold text-ink">Message</p>
                  <div className="rounded-lg border border-border bg-card p-4 text-[13px] text-muted">
                    Type or dictate your message
                  </div>
                  <p className="text-[12px] text-muted">
                    Include assets, beneficiaries, dependants, or special wishes. Rough notes are fine.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost" size="sm">
                    Attach
                  </Button>
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
                    Send
                  </Button>
                </div>
              </Card>

              <div className="hidden flex-wrap gap-3 lg:flex">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-[12px] text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none">
                    <path
                      d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M19 11a7 7 0 0 1-14 0"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 18v3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Voice input
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-[12px] text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none">
                    <path
                      d="M12 16V4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 8l4-4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="16"
                      width="16"
                      height="4"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Upload documents
                </span>
              </div>

              <Callout className="hidden space-y-2 lg:block">
                <p className="text-[13px] font-semibold text-ink">What to share</p>
                <p className="text-[13px] leading-6 text-muted">
                  List your assets, beneficiaries, dependants, and any special wishes. Rough
                  descriptions are fine — we will confirm details later.
                </p>
              </Callout>
            </div>

            <div className="hidden space-y-4 lg:block">
              <Card size="lg" className="space-y-3">
                <div className="space-y-1">
                  <p className="font-display text-xl font-semibold text-ink">Draft status</p>
                  <p className="text-[13px] text-muted">
                    We update this as you share information. Nothing is final until you review.
                  </p>
                </div>
                <div className="space-y-1 text-[13px] text-muted">
                  <p>• Assets mentioned: {assetsCount || 4}</p>
                  <p>• Beneficiaries mentioned: {beneficiaryCount || 3}</p>
                  <p className="text-warning">• Missing: executor, guardian, remaining assets</p>
                </div>
              </Card>

              <Callout className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                    <path
                      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">Your privacy</p>
                    <p className="text-[13px] leading-6 text-muted">
                      Your inputs are encrypted and used only to build your draft. You can delete
                      your data at any time.
                    </p>
                  </div>
                </div>
              </Callout>

              <Card size="lg" className="space-y-3">
                <div className="space-y-1">
                  <p className="font-display text-xl font-semibold text-ink">Next steps</p>
                  <p className="text-[13px] text-muted">
                    When you are ready, we will generate a structured summary for review.
                  </p>
                </div>
                <div className="space-y-2 text-[13px] text-muted">
                  <p>• Review extracted items</p>
                  <p>• Confirm any missing details</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/drafting/ai-summary")}
                >
                  Generate summary
                </Button>
              </Card>

              <Callout className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M12 8v4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-ink">Why we ask these questions</p>
                    <p className="text-[13px] leading-6 text-muted">
                      These details help your executor act clearly and reduce family disputes. You can
                      edit or remove anything before signing.
                    </p>
                  </div>
                </div>
              </Callout>
            </div>
          </div>

          <div className="mt-6 lg:hidden">
            <Callout className="space-y-2">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4.5 w-4.5 text-primary" fill="none">
                  <path
                    d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="text-[13px] font-semibold text-ink">Privacy reminder</p>
                  <p className="text-[13px] leading-6 text-muted">
                    Your inputs are encrypted and used only to build your draft. You can delete
                    your data at any time before signing.
                  </p>
                </div>
              </div>
            </Callout>
          </div>
        </Container>
      </div>
    </WorkspaceShell>
  );
}
