// Frame: AI Extraction Summary (9MjGI)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { TrustPanel } from "../../components/ui/TrustPanel";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";

export default function AiExtractionSummary() {
  const { data } = useDraftingData();
  const assets = data.assets.filter((asset) => asset.location || asset.notes).map((asset) => asset.label);
  const beneficiaries = data.beneficiaries
    .filter((beneficiary) => beneficiary.name)
    .map((beneficiary) => `${beneficiary.name}${beneficiary.relationship ? ` (${beneficiary.relationship})` : ""}`);
  const confidence = data.aiDraftSession?.confidence ?? "medium";
  const executorStatus = [
    data.executors[0]?.name ? "Primary executor added" : "Primary executor not yet added",
    data.executors[1]?.name ? "Backup executor added" : "Backup executor not yet added"
  ];
  const extractionCards = [
    {
      title: "Assets found",
      items: assets.length > 0 ? assets : ["No assets captured yet"],
      cta: { label: "Review assets", path: "/drafting/mapping" }
    },
    {
      title: "Beneficiaries found",
      items: beneficiaries.length > 0 ? beneficiaries : ["No beneficiaries captured yet"],
      cta: { label: "Review beneficiaries", path: "/drafting/mapping" }
    },
    {
      title: "Executor status",
      items: executorStatus,
      cta: { label: "Review executors", path: "/drafting/structured-executors" }
    }
  ];

  const missingItems = [
    !data.executors[0]?.name && "Primary executor",
    !data.beneficiaries[0]?.name && "Beneficiaries",
    assets.length === 0 && "Assets",
    data.hasMinors && !data.guardians[0]?.name && "Guardian for minors"
  ].filter(Boolean) as string[];

  const mappingPreview = data.assetAllocations.length ? data.assetAllocations : [];

  return (
    <WorkspaceShell>
      <Container size="wide" className="pb-24 pt-12">
        <PageHeader
          eyebrow="AI Drafting"
          title="AI extraction summary"
          description="We extracted the details below. Please confirm missing items and adjust anything that feels incomplete before we structure the full will."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card size="lg" variant="success" className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge tone="success">Draft summary ready</Badge>
              <Badge tone="info">Confidence: {confidence}</Badge>
            </div>
            <p className="text-sm font-semibold text-ink">
              We extracted {Math.max(assets.length, 0)} assets and {Math.max(beneficiaries.length, 0)} beneficiaries.
            </p>
            <p className="text-sm text-muted">
              Please confirm missing items before you finalize. You stay in control of every section.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-workspace")}>
                Add more notes
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
                Continue to structured flow
              </Button>
            </div>
          </Card>
          <Card size="lg" className="space-y-2">
            <p className="text-sm font-semibold text-ink">What happens next</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Review assets and beneficiaries for completeness.</li>
              <li>Match each asset to the people who should receive it.</li>
              <li>Confirm executors and guardianship if relevant.</li>
            </ul>
            <p className="text-xs text-muted">You can edit everything before exporting or signing.</p>
          </Card>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {extractionCards.map((card) => (
            <Card key={card.title} size="lg" className="space-y-3">
              <p className="text-sm font-semibold text-ink">{card.title}</p>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate(card.cta.path)}>
                  {card.cta.label}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/ai-workspace")}>
                  Edit in conversation
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Callout tone="warning">
            Add an executor, confirm any dependants, and specify any remaining assets so the draft is complete.
          </Callout>
          <Card size="lg" className="space-y-3">
            <p className="text-sm font-semibold text-ink">Missing information to confirm</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {missingItems.length > 0 ? (
                missingItems.map((item) => <li key={item}>{item}</li>)
              ) : (
                <li>All critical items are captured.</li>
              )}
            </ul>
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
              Add missing details
            </Button>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card size="lg" className="space-y-3">
            <p className="text-sm font-semibold text-ink">Assets to beneficiaries mapping</p>
            {mappingPreview.length > 0 ? (
              <div className="space-y-3">
                {mappingPreview.map((allocation) => (
                  <div key={allocation.assetLabel} className="rounded-xl border border-border bg-secondary p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{allocation.assetLabel}</p>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/drafting/mapping")}>
                        Edit allocation
                      </Button>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                      {allocation.allocations.map((item, index) => (
                        <li key={`${allocation.assetLabel}-${index}`}>
                          {item.beneficiary} - {item.share || "Share to confirm"}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                No asset allocations yet. The next step helps you link each asset to the people who should receive it.
              </p>
            )}
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/mapping")}>
              Review mapping
            </Button>
          </Card>

          <TrustPanel
            title="Review before we draft"
            items={[
              "We never finalize a will without your explicit confirmation.",
              "You can edit every section before exporting or signing.",
              "Advocate review is available for complex estates."
            ]}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink">
            You can return to the AI workspace to refine the summary or continue into structured drafting.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/ai-workspace")}>
              Back to conversation
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("/drafting/structured-flow")}>
              Continue to structured flow
            </Button>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
