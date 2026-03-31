// Frame: Structured Special Wishes (CVyk3)
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { Textarea } from "../../components/ui/Textarea";
import { HelperCallout } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { navigate } from "../../lib/navigation";

export default function StructuredSpecialWishes() {
  const { data, update } = useDraftingMode("structured");

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: (
          <>
            <span className="sm:hidden">Save</span>
            <span className="hidden sm:inline">Save and exit</span>
          </>
        ),
        ctaMode: "structured",
        ctaPath: "/"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
              Step 7 of 8: Special wishes and residue
            </p>
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Special wishes and residue
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              Use this space for final wishes or instructions not covered elsewhere. Keep them clear and realistic so
              they can be carried out.
            </p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-muted">Step 7 of 8 — Special wishes</p>
              <div className="h-2 rounded-full border border-border bg-secondary">
                <div className="h-full w-[87.5%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-4">
              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Special wishes</p>
                  <p className="text-[13px] text-muted">
                    Optional instructions such as funeral preferences or personal messages.
                  </p>
                </div>
                <div className="space-y-3">
                  <FieldGroup label="Special wishes (optional)">
                    <Textarea
                      placeholder="Any special instructions you want to include."
                      value={data.specialWishes}
                      onChange={(event) => update({ specialWishes: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Funeral wishes (optional)">
                    <Textarea
                      placeholder="Share funeral or burial preferences."
                      value={data.funeralWishes}
                      onChange={(event) => update({ funeralWishes: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Digital assets (optional)">
                    <Textarea
                      placeholder="Include guidance on online accounts or digital property."
                      value={data.digitalWishes}
                      onChange={(event) => update({ digitalWishes: event.target.value })}
                    />
                  </FieldGroup>
                  <FieldGroup label="Charitable intentions (optional)">
                    <Textarea
                      placeholder="List any charitable gifts or bequests."
                      value={data.charitableIntentions}
                      onChange={(event) =>
                        update({ charitableIntentions: event.target.value })
                      }
                    />
                  </FieldGroup>
                </div>
              </Card>

              <Card size="lg" className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Residue (what is left)</p>
                  <p className="text-[13px] text-muted">Decide who receives anything not listed elsewhere.</p>
                </div>
                <FieldGroup label="Residue clause">
                  <Textarea
                    placeholder="Write who should receive remaining assets."
                    value={data.remainderClause}
                    onChange={(event) => update({ remainderClause: event.target.value })}
                  />
                </FieldGroup>
              </Card>

              <HelperCallout
                title="Why we ask this"
                body="Clear residue instructions prevent assets from being left out or disputed."
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/drafting/review-result")}
                >
                  Continue to review
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/drafting/structured/beneficiaries")}
                >
                  Back to beneficiaries
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <HelperCallout
                title="Keep it practical"
                body="Courts can only enforce clear, lawful instructions. Keep wishes short and specific."
              />
              <HelperCallout
                title="When to seek advice"
                body="If your wishes are complex or involve trusts, consider advocate review."
              />
              <HelperCallout
                title="Can I leave this blank?"
                body="Yes. It is optional. You can add special wishes later if needed."
              />
              <HelperCallout
                title="Examples"
                body="Sample wording to guide you."
              />
              <Card size="lg" className="space-y-3">
                <div className="space-y-1.5">
                  <p className="font-display text-xl font-semibold text-ink">Examples</p>
                  <p className="text-[13px] text-muted">Sample wording to guide you.</p>
                </div>
                <div className="space-y-2 text-[13px] text-ink">
                  <p>&bull; “I want my executor to donate my library to the local school.”</p>
                  <p>&bull; “My remains should be buried in Nyeri.”</p>
                  <p className="text-muted">&bull; Keep instructions realistic and legal.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
