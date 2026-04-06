// Frame: AI Review (WlRtD)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { AiStepNav } from "../../components/drafting/AiStepNav";
import { StructuredStepNav } from "../../components/drafting/StructuredStepNav";
import { Button } from "../../components/ui/Button";
import {
  DocumentPreview,
  HelperCallout,
  ReviewChecklist,
  SectionCard,
  SuccessPanel,
  SummaryCard,
  WarningBanner
} from "../../components/ui/PencilPanels";
import { useDraftingData } from "../../lib/drafting";
import { api } from "../../lib/api";
import { STORAGE_KEYS } from "../../lib/storage";
import { navigate } from "../../lib/navigation";
import { useState } from "react";
import { trackEvent } from "../../lib/analytics";

export default function Review() {
  const { data, session, status } = useDraftingData();
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [resumeStatus, setResumeStatus] = useState<string | null>(null);
  const [resumeLink, setResumeLink] = useState<string | null>(null);
  const [savingResume, setSavingResume] = useState(false);
  const flowLabel = data.draftingMode === "ai" ? "AI drafting" : "Guided drafting";
  const assetLabels = data.assets
    .map((asset) => asset.label?.trim() || asset.location?.trim() || asset.notes?.trim() || "")
    .filter(Boolean);
  const beneficiaries = data.beneficiaries
    .map((beneficiary) => beneficiary.name?.trim() || "")
    .filter(Boolean);
  const assetCount = data.assets.filter((asset) => asset.location || asset.notes).length;
  const executorName = data.executors?.[0]?.name?.trim() || "";
  const guardianName = data.guardians?.[0]?.name?.trim() || "";
  const hasRemainderClause = Boolean(data.remainderClause?.trim());
  const hasExecutor = Boolean(executorName);
  const hasBeneficiaries = beneficiaries.length > 0;
  const hasAssets = assetCount > 0;
  const hasAllocations = data.assetAllocations.some(
    (allocation) => allocation.allocations?.length > 0
  );

  const allocationLines = data.assetAllocations.flatMap((allocation) => {
    const assetLabel = allocation.assetLabel?.trim();
    if (!assetLabel) return [];
    const targets = allocation.allocations
      .map((target) => target.beneficiary?.trim() || "")
      .filter(Boolean);
    if (!targets.length) {
      return [`${assetLabel} -> Not assigned (please confirm)`];
    }
    return [`${assetLabel} -> ${targets.join(", ")}`];
  });

  const summaryLines =
    allocationLines.length > 0
      ? allocationLines
      : assetLabels.length > 0
        ? assetLabels.map((asset) => `${asset} -> Not assigned (please confirm)`)
        : [];

  const missingItems = [
    !hasExecutor ? "assign an executor" : null,
    !hasAssets ? "add assets" : null,
    !hasBeneficiaries ? "add beneficiaries" : null,
    !hasAllocations ? "assign assets to beneficiaries" : null,
    !hasRemainderClause ? "set a remainder clause" : null
  ].filter(Boolean) as string[];

  const handleGenerateDraft = async () => {
    try {
      setGenerateError(null);
      if (!session) {
        setGenerateError("Draft session is not ready yet. Please wait and try again.");
        return;
      }
      const response = await api.post(
        `/api/v1/draft-sessions/${session.sessionId}/finalize`,
        {},
        { headers: { "x-draft-token": session.resumeToken } }
      );
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEYS.willResult,
          JSON.stringify(response?.data ?? {})
        );
      }
      trackEvent({
        event: "draft_finalize",
        payload: { sessionId: session.sessionId, version: response?.data?.version ?? null }
      });
      navigate("/drafting/export-options");
    } catch (error) {
      setGenerateError("Unable to generate your draft. Please try again.");
    }
  };

  const handleSaveForLater = async () => {
    setResumeStatus(null);
    setResumeLink(null);
    if (!session) {
      setResumeStatus("Draft session is not ready yet.");
      return;
    }
    if (!data.email) {
      setResumeStatus("Add an email address so we can send your resume link.");
      return;
    }
    setSavingResume(true);
    try {
      const response = await api.post(
        `/api/v1/draft-sessions/${session.sessionId}/resume-link`,
        { email: data.email },
        { headers: { "x-draft-token": session.resumeToken } }
      );
      if (response?.data?.resumeLink) {
        setResumeLink(response.data.resumeLink);
      }
      trackEvent({ event: "resume_link_requested", payload: { sessionId: session.sessionId } });
      setResumeStatus("Resume link ready. Check your email for the link.");
    } catch (error: any) {
      const link = error?.response?.data?.resumeLink;
      if (link) {
        setResumeLink(link);
      }
      setResumeStatus("We could not send email. Use the resume link below.");
    } finally {
      setSavingResume(false);
    }
  };
  const editPath =
    data.draftingMode === "ai"
      ? "/drafting/ai/summary"
      : "/drafting/structured/assets";
  const editLabel =
    data.draftingMode === "ai"
      ? "Back to AI summary"
      : "Back to assets & beneficiaries";

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export options</span>
          </>
        ),
        ctaPath: "/drafting/export-options",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              {flowLabel} - Step 6 of 6: Review
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">Review</h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Review the summary and confirm everything is correct before you proceed.
            </p>
            {data.draftingMode === "ai" ? (
              <AiStepNav currentPath="/drafting/ai/review" />
            ) : (
              <StructuredStepNav currentPath="/drafting/review-result" />
            )}
          </div>

          <SuccessPanel
            title="Ready to generate"
            body="Confirm the summary below. We will generate your draft once you continue."
          />
          {status.error ? <WarningBanner title="Sync issue" body={status.error} /> : null}
          {generateError ? (
            <WarningBanner title="Generation failed" body={generateError} />
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-4">
              <SectionCard
                title="Your instructions summary"
                subtitle="Plain-English overview of what you asked for, with room to edit."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  {summaryLines.length ? (
                    summaryLines.map((line) => {
                      const isWarning =
                        line.includes("Not specified") || line.includes("Not assigned");
                      return (
                        <p key={line} className={isWarning ? "text-warning" : ""}>
                          &bull; {line}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-muted">&bull; No assets or allocations captured yet.</p>
                  )}
                </div>
              </SectionCard>

              <SectionCard
                title="Executors and guardianship"
                subtitle="Key people who carry out your wishes and care for minors."
              >
                <div className="space-y-2 text-[13px]">
                  <p className={executorName ? "text-ink" : "text-warning"}>
                    &bull; Executor: {executorName || "Not provided"}
                  </p>
                  <p className="text-muted">&bull; Backup executor: Not provided</p>
                  <p className="text-muted">
                    &bull; Guardianship:{" "}
                    {data.hasMinors
                      ? guardianName || "Not provided"
                      : "Not applicable (no minor children listed)"}
                  </p>
                </div>
              </SectionCard>

              <SectionCard
                title="Validity checklist"
                subtitle="We flag items that could affect legal validity or clarity."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; You must sign in front of two independent witnesses</p>
                  <p>&bull; A beneficiary cannot be a witness</p>
                  <p>&bull; Executor and beneficiary details should match their legal names</p>
                </div>
              </SectionCard>

              <WarningBanner
                title="Warnings to resolve"
                body={
                  missingItems.length
                    ? `Please ${missingItems.join(", ")} before signing.`
                    : "Review your draft and confirm details before signing."
                }
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full px-5 py-3 text-[13px] sm:w-auto"
                  onClick={handleGenerateDraft}
                  disabled={status.loading}
                >
                  Generate draft
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full px-5 py-3 text-[13px] sm:w-auto"
                  onClick={handleSaveForLater}
                  disabled={savingResume}
                >
                  {savingResume ? "Saving..." : "Save and resume later"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full px-5 py-3 text-[13px] sm:w-auto"
                  onClick={() => navigate(editPath)}
                >
                  {editLabel}
                </Button>
              </div>
              {resumeStatus ? (
                <p className="text-[12px] text-muted">{resumeStatus}</p>
              ) : null}
              {resumeLink ? (
                <p className="break-all text-[12px] text-ink">{resumeLink}</p>
              ) : null}
            </div>

            <div className="space-y-4">
              <SummaryCard
                title="Draft overview"
                lines={[
                  `Beneficiaries: ${data.beneficiaries.filter((b) => b.name).length}`,
                  `Assets: ${assetCount}`,
                  `Executors: ${data.executors.filter((e) => e.name).length}`
                ]}
              />
              <ReviewChecklist
                title="Completeness checks"
                items={[
                  { label: "Executor selected", tone: hasExecutor ? "success" : "warning" },
                  { label: "Assets listed", tone: hasAssets ? "success" : "warning" },
                  { label: "Beneficiaries added", tone: hasBeneficiaries ? "success" : "warning" },
                  {
                    label: "Assets assigned to beneficiaries",
                    tone: hasAllocations ? "success" : "warning"
                  },
                  { label: "Remainder clause added", tone: hasRemainderClause ? "success" : "warning" }
                ]}
              />
              <DocumentPreview title="Draft preview" placeholder="Preview will draft" />
              <SectionCard
                title="After you sign"
                subtitle="Keep the will accessible and tell the right people."
              >
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; Store the signed copy safely</p>
                  <p>&bull; Tell your executor where it is kept</p>
                  <p className="text-muted">&bull; Update this will if your circumstances change</p>
                </div>
              </SectionCard>
              <HelperCallout
                title="Need an advocate?"
                body="If your estate is complex, has foreign assets, or may be contested, request an advocate review before you sign."
              />
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
