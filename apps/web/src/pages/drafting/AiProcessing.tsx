import { useEffect, useMemo, useRef, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ErrorBanner, HelperCallout, WarningBanner } from "../../components/ui/PencilPanels";
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
    summary: string;
    extracted: {
      personalDetails: {
        fullName?: string;
        maritalStatus?: string;
        spouseName?: string;
        domicile?: string;
        notes?: string;
      };
      familyStructure: {
        hasMinors?: boolean;
        children: Array<{
          name: string;
          relationship?: string;
          age?: string;
          notes?: string;
          confidence?: number;
        }>;
        dependants: Array<{
          name: string;
          relationship?: string;
          notes?: string;
          confidence?: number;
        }>;
      };
      executors: Array<{ name: string; relationship?: string; notes?: string; confidence?: number }>;
      guardians: Array<{ name: string; relationship?: string; notes?: string; confidence?: number }>;
      assets: Array<{
        label: string;
        details?: string;
        category?: string;
        isForeign?: boolean;
        confidence?: number;
      }>;
      beneficiaries: Array<{
        name: string;
        relationship?: string;
        share?: string;
        notes?: string;
        confidence?: number;
      }>;
      residue: {
        notes?: string;
        beneficiaries: Array<{
          name: string;
          relationship?: string;
          share?: string;
          notes?: string;
          confidence?: number;
        }>;
      };
      specialWishes: Array<{ text: string; confidence?: number }>;
    };
    missingInformation: string[];
    ambiguityWarnings: string[];
    complexitySignals: string[];
    confidence: number;
    recommendedNextQuestions: string[];
  } | null;
};

type ProcessingStage = "idle" | "summarizing" | "extracting" | "finalizing" | "complete" | "error";

export default function AiProcessing() {
  const { data, update, session } = useDraftingData();
  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const notes = useMemo(() => (data.aiDraftSession.freeTextNotes ?? "").trim(), [data.aiDraftSession.freeTextNotes]);
  const candidateCounts = useMemo(() => {
    const extracted = data.aiDraftSession.extractionCandidates?.extracted;
    if (!extracted) return 0;
    return (
      extracted.assets.length +
      extracted.beneficiaries.length +
      extracted.executors.length +
      extracted.guardians.length +
      extracted.specialWishes.length +
      extracted.familyStructure.children.length +
      extracted.familyStructure.dependants.length
    );
  }, [data.aiDraftSession.extractionCandidates?.extracted]);
  const hasCandidates = Boolean(data.aiDraftSession.extractionCandidates?.summary) || candidateCounts > 0;
  const abstained = Boolean(data.aiDraftSession.abstained);
  const shouldProcess =
    Boolean(session) &&
    Boolean(notes) &&
    data.aiDraftSession.processingState !== "processing" &&
    (data.aiDraftSession.processingState === "queued" ||
      data.aiDraftSession.lastProcessedNotes !== notes ||
      (!data.aiDraftSession.lastProcessedNotes && notes.length > 0));

  useEffect(() => {
    if (!session) return;
    if (!notes) return;
    if (!shouldProcess) return;
    if (inFlight.current) return;

    const run = async () => {
      inFlight.current = true;
      setError(null);
      setStage("summarizing");
      update({
        aiDraftSession: {
          ...data.aiDraftSession,
          processingState: "processing",
          lastError: ""
        }
      });

      try {
        const summarize = await api.post(
          "/api/v1/ai/summarize",
          { draftSessionId: session.sessionId, freeText: notes },
          { headers: { "x-draft-token": session.resumeToken } }
        );

        setStage("extracting");
        const extract = await api.post<AiExtractResponse>(
          "/api/v1/ai/extract",
          { draftSessionId: session.sessionId, freeText: notes, inputSnapshot: data },
          { headers: { "x-draft-token": session.resumeToken } }
        );

        setStage("finalizing");
        const rawStructuredOutput = extract.data.structuredOutput;
        const structuredOutput =
          rawStructuredOutput ?? {
            summary: "",
            extracted: {
              personalDetails: {},
              familyStructure: { children: [], dependants: [] },
              executors: [],
              guardians: [],
              assets: [],
              beneficiaries: [],
              residue: { beneficiaries: [] },
              specialWishes: []
            },
            missingInformation: [],
            ambiguityWarnings: [],
            complexitySignals: [],
            confidence: 0,
            recommendedNextQuestions: []
          };

        update({
          aiDraftSession: {
            ...data.aiDraftSession,
            freeTextNotes: notes,
            summary: summarize.data.summary ?? "",
            updatedAt: new Date().toISOString(),
            confidence: String(extract.data.confidence ?? ""),
            interactionId: extract.data.interactionId,
            extractionCandidates: structuredOutput,
            abstained: extract.data.abstained || !rawStructuredOutput,
            uncertainty: extract.data.uncertainty ?? "",
            processingState: "complete",
            lastProcessedNotes: notes,
            lastError: ""
          }
        });

        setStage("complete");
        navigate("/drafting/ai/summary");
      } catch (err) {
        const info = describeApiError(err, "AI processing");
        console.error("[ai] processing failed", info, err);
        setStage("error");
        setError(info.message);
        update({
          aiDraftSession: {
            ...data.aiDraftSession,
            processingState: "error",
            lastError: info.message
          }
        });
      } finally {
        inFlight.current = false;
      }
    };

    run();
  }, [data, notes, session, shouldProcess, update]);

  useEffect(() => {
    if (data.aiDraftSession.processingState === "complete") {
      setStage("complete");
    }
    if (data.aiDraftSession.processingState === "error") {
      setStage("error");
    }
  }, [data.aiDraftSession.processingState]);

  return (
    <WorkspaceShell nav={{ ctaLabel: "Save", ctaMode: "ai", ctaPath: "/drafting/ai/summary" }}>
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              AI drafting — Step 3 of 6: Processing status
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Processing status</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              We are summarizing your notes and extracting structured candidates for review.
            </p>
            <AiStepNav currentPath="/drafting/ai/processing" />
          </div>

          {!notes ? (
            <WarningBanner
              title="Notes required"
              body="Add your notes in the previous step to begin AI processing."
            />
          ) : null}

          {error ? (
            <ErrorBanner
              title="AI processing failed"
              body={`${error} You can retry or continue with manual structured entry.`}
            />
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <Card size="lg" className="space-y-3">
                <p className="font-display text-xl font-semibold text-ink">Progress</p>
                <div className="space-y-2 text-[13px] text-muted">
                  <p>1. Summarizing your notes {stage === "summarizing" ? "…" : stage === "idle" ? "" : "✓"}</p>
                  <p>
                    2. Extracting assets, beneficiaries, executors{" "}
                    {stage === "extracting" ? "…" : stage === "summarizing" || stage === "idle" ? "" : "✓"}
                  </p>
                  <p>3. Checking confidence and gaps {stage === "finalizing" ? "…" : stage === "complete" ? "✓" : ""}</p>
                </div>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/drafting/ai/summary")}
                  disabled={!hasCandidates}
                >
                  Review extraction summary
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai/input")}>
                  Back to AI notes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    update({
                      aiDraftSession: {
                        ...data.aiDraftSession,
                        processingState: "queued",
                        lastError: ""
                      }
                    });
                    setStage("idle");
                    setError(null);
                  }}
                  disabled={!notes || stage === "summarizing" || stage === "extracting" || stage === "finalizing"}
                >
                  Retry processing
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {abstained ? (
                <WarningBanner
                  title="AI abstained"
                  body="We could not produce high-confidence candidates. You can continue with manual structured entry."
                />
              ) : null}
              <HelperCallout
                title="No hidden demo fallback"
                body="If AI abstains or fails schema validation, the UI explicitly says so and points you to manual structured entry."
              />
              <HelperCallout
                title="Deterministic legal backbone remains primary"
                body="Only confirmed structured data is used in final deterministic will generation."
              />
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
