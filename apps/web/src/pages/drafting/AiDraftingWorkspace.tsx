import { useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { HelperCallout, WarningBanner } from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";
import { api } from "../../lib/api";
import { describeApiError } from "../../lib/apiErrors";

type AiExtractResponse = {
  interactionId: string;
  confidence: number;
  abstained: boolean;
  uncertainty?: string;
  structuredOutput: {
    assets: Array<{ label: string; details?: string; confidence?: number }>;
    beneficiaries: Array<{ name: string; relationship?: string; confidence?: number }>;
    executors: Array<{ name: string; relationship?: string; confidence?: number }>;
    guardians: Array<{ name: string; relationship?: string; confidence?: number }>;
    specialWishes: Array<{ text: string; confidence?: number }>;
    notes: string[];
  } | null;
};

export default function AiDraftingWorkspace() {
  const { data, update, session, status } = useDraftingData();
  const [freeText, setFreeText] = useState(data.aiDraftSession.freeTextNotes ?? "");
  const [topic, setTopic] = useState("");
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const examplePrompts = [
    "I want my spouse to keep our home in Kiambu, and my two children to share my remaining assets equally.",
    "Appoint my sister Wanjiku as executor and my cousin David as backup executor.",
    "We have two minor children; I want my brother to be guardian if both parents are gone.",
    "Give my bank savings and SACCO shares to my mother, and the car to my son.",
    "I own land in Nakuru and a plot in Kitengela. They should go to my three children in equal shares.",
    "I run a small shop and want it to continue under my spouse's management.",
    "Please set aside school fees for my daughter until she finishes university.",
    "My M-Pesa balance and mobile money savings should go to my spouse.",
    "I want my business partner to buy my shares, with proceeds going to my family.",
    "I have a digital wallet and online accounts; transfer access to my executor.",
    "I wish to donate KES 200,000 to my church after debts are paid.",
    "If any beneficiary predeceases me, their share should go to their children.",
    "My parents should receive my rural land while my spouse receives our Nairobi home.",
    "Name my aunt as guardian for my youngest child; my older child can choose at 18.",
    "I have no children; my estate should go to my spouse and then to my siblings.",
    "I want my brother to manage my rental property until it is sold.",
    "Please note any debts and funeral wishes I have shared with my family.",
    "Set aside livestock and farm equipment for my son who runs the farm.",
    "I want my nephew to receive my motorcycle and tools for his business.",
    "I want my executor to pay all outstanding school fees before distribution.",
    "If my spouse remarries, their inheritance should be limited to the family home.",
    "I want my digital photos and social media accounts archived by my executor.",
    "Split my savings account 60/40 between my spouse and my mother.",
    "I have foreign assets in Uganda and need an advocate review."
  ];

  const candidateCount = useMemo(() => {
    const c = data.aiDraftSession.extractionCandidates;
    if (!c) return 0;
    return c.assets.length + c.beneficiaries.length + c.executors.length + c.guardians.length + c.specialWishes.length;
  }, [data.aiDraftSession.extractionCandidates]);

  const handleExtract = async () => {
    setError(null);
    if (!session) {
      setError("Draft session is still loading. Please wait a moment.");
      return;
    }
    if (!freeText.trim()) {
      setError("Please add free-text notes first.");
      return;
    }

    setLoadingExtract(true);
    try {
      const summarize = await api.post(
        "/api/v1/ai/summarize",
        { draftSessionId: session.sessionId, freeText },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      const extract = await api.post<AiExtractResponse>(
        "/api/v1/ai/extract",
        { draftSessionId: session.sessionId, freeText, inputSnapshot: data },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      update({
        aiDraftSession: {
          ...data.aiDraftSession,
          freeTextNotes: freeText,
          summary: summarize.data.summary ?? "",
          updatedAt: new Date().toISOString(),
          confidence: String(extract.data.confidence),
          interactionId: extract.data.interactionId,
          extractionCandidates:
            extract.data.structuredOutput ?? {
              assets: [],
              beneficiaries: [],
              executors: [],
              guardians: [],
              specialWishes: [],
              notes: []
            },
          abstained: extract.data.abstained,
          uncertainty: extract.data.uncertainty ?? ""
        }
      });

      navigate("/drafting/ai/summary");
    } catch (err) {
      const info = describeApiError(err, "AI analysis");
      console.error("[ai] extract failed", info, err);
      setError(`${info.message} You can continue with manual structured entry.`);
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleExplain = async () => {
    setError(null);
    if (!session) {
      setError("Draft session is still loading. Please wait a moment.");
      return;
    }
    if (!topic.trim()) {
      setError("Enter a field or topic to explain.");
      return;
    }

    setLoadingExplain(true);
    try {
      const response = await api.post(
        "/api/v1/ai/explain",
        {
          draftSessionId: session.sessionId,
          topic,
          context: freeText.slice(0, 500)
        },
        { headers: { "x-draft-token": session.resumeToken } }
      );

      update({
        aiDraftSession: {
          ...data.aiDraftSession,
          explain: {
            topic,
            explanation: response.data.explanation,
            confidence: response.data.confidence,
            uncertainty: response.data.uncertainty
          }
        }
      });
    } catch (err) {
      const info = describeApiError(err, "AI explanation");
      console.error("[ai] explain failed", info, err);
      setError(info.message);
    } finally {
      setLoadingExplain(false);
    }
  };

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save", ctaMode: "ai", ctaPath: "/drafting/ai/summary" }}>
      <div className="pb-24 pt-10">
        <Container size="wide" className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting - bounded assist only
            </p>
            <AiStepNav currentPath="/drafting/ai/input" />
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              Tell us who should inherit what and who should carry out your wishes
            </h1>
            <p className="max-w-[760px] text-[16px] leading-7 text-muted">
              Write naturally. The assistant turns your notes into structured candidates for your review. It cannot finalize the will or replace your confirmation.
            </p>
          </div>

          {status.error ? <WarningBanner title="Sync issue" body={status.error} /> : null}
          {error ? <WarningBanner title="AI assist" body={error} /> : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card size="lg" className="space-y-4 p-7">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-ink">Assistant prompt</p>
                <div className="space-y-3 rounded-2xl border border-sand-200 bg-sand-50 p-4">
                  <div className="space-y-1">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                      Assistant
                    </p>
                    <p className="text-[14px] leading-6 text-ink">
                      Start by describing your family, assets, and wishes. Mention who should inherit what, who should be executor, whether you have minors, and any guardianship preferences.
                    </p>
                  </div>
                  {freeText.trim() ? (
                    <div className="rounded-xl border border-ink/10 bg-white p-3">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">You</p>
                      <p className="text-[14px] leading-6 text-ink">{freeText}</p>
                    </div>
                  ) : (
                    <p className="text-[13px] text-muted">
                      Once you start typing, your note will appear here as part of the exchange.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-ink">Your notes</p>
                <Textarea
                  className="min-h-[240px]"
                  value={freeText}
                  onChange={(event) => setFreeText(event.target.value)}
                  placeholder="Describe your family, assets, and wishes. Example: My spouse should keep our home, my two children should share the rest equally, and my sister should be executor."
                />
                <p className="text-[12px] text-muted">
                  Be specific about beneficiaries, executors, guardians, and any special wishes. The assistant will show its confidence and abstain when unsure.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={handleExtract} disabled={loadingExtract || !session}>
                  {loadingExtract ? "Analyzing..." : "Analyze and suggest structure"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured/assets")}>
                  Switch to manual structured flow
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <p className="font-display text-xl font-semibold text-ink">What to include</p>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Who should inherit what (people, shares, assets)</p>
                  <p>&bull; Who should be executor, plus a backup if possible</p>
                  <p>&bull; Whether you have minors and who should be guardian</p>
                  <p>&bull; Special wishes, debts, funeral or charitable instructions</p>
                  <p>&bull; Assets: land, bank accounts, SACCO, M-Pesa, business interests, vehicles, digital assets</p>
                </div>
              </Card>

              <Card size="lg" className="space-y-3">
                <p className="font-display text-xl font-semibold text-ink">Need a field explained?</p>
                <Input
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="e.g. remainder clause"
                />
                <Button variant="ghost" size="sm" onClick={handleExplain} disabled={loadingExplain || !session}>
                  {loadingExplain ? "Explaining..." : "Explain"}
                </Button>
                {data.aiDraftSession.explain?.explanation ? (
                  <p className="text-[13px] leading-6 text-muted">{data.aiDraftSession.explain.explanation}</p>
                ) : null}
              </Card>

              <HelperCallout
                title="Safety boundary"
                body="AI suggestions never overwrite your confirmed details. You must accept or edit every structured candidate."
              />

              <Card size="lg" className="space-y-2">
                <p className="text-[13px] text-muted">Current extracted candidate count</p>
                <p className="text-xl font-semibold text-ink">{candidateCount}</p>
                <p className="text-[12px] text-muted">
                  If confidence is low, the system abstains and directs you to manual entry.
                </p>
              </Card>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Card size="lg" className="space-y-4 p-6">
              <p className="font-display text-xl font-semibold text-ink">Example prompts</p>
              <p className="text-[13px] text-muted">
                Pick one and adapt it. The more detail you give, the stronger the structured suggestions.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {examplePrompts.map((prompt) => (
                  <div key={prompt} className="rounded-xl border border-sand-200 bg-sand-50 p-3">
                    <p className="text-[13px] leading-6 text-ink">{prompt}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card size="lg" className="space-y-3 p-6">
              <p className="font-display text-xl font-semibold text-ink">What the assistant does</p>
              <div className="space-y-2 text-[13px] text-ink">
                <p>&bull; Summarizes your notes into reviewable structured fields</p>
                <p>&bull; Flags uncertainty and asks for confirmation</p>
                <p>&bull; Suggests when advocate review may be needed</p>
              </div>
              <div className="space-y-2 text-[13px] text-muted">
                <p>&bull; It does not finalize your will or replace legal advice</p>
                <p>&bull; It cannot sign on your behalf</p>
                <p>&bull; You must confirm every detail before a draft is generated</p>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </WorkspaceShell>
  );
}
