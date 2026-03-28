// Frame: Advocate Review (K02wp)
import { useMemo, useState } from "react";
import { WorkspaceShell } from "../../components/layout/WorkspaceShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { HelperCallout, SectionCard } from "../../components/ui/PencilPanels";
import { useDraftingMode } from "../../lib/drafting";
import { STORAGE_KEYS } from "../../lib/storage";
import { api } from "../../lib/api";

export default function AdvocateReview() {
  const { data, update } = useDraftingMode("structured");
  const [form, setForm] = useState({
    name: data.legalName || "",
    contact: data.email || data.phone || "",
    notes: ""
  });
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const willId = useMemo(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(STORAGE_KEYS.willResult);
    if (!stored) return null;
    try {
      return (JSON.parse(stored) as { id?: string }).id ?? null;
    } catch {
      return null;
    }
  }, []);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setStatus(null);
    update({
      exportPreferences: {
        ...data.exportPreferences,
        advocateReview: true
      }
    });
    if (!willId) {
      setStatus("Generate a draft first so we can attach it to your review request.");
      setSubmitting(false);
      return;
    }
    if (!form.contact) {
      setStatus("Please provide an email so we can contact you.");
      setSubmitting(false);
      return;
    }
    try {
      await api.post(`/api/v1/wills/${willId}/lead`, {
        email: form.contact,
        metadata: {
          source: "advocate-review",
          name: form.name,
          notes: form.notes
        }
      });
      setStatus("Request received. We will contact you within one business day.");
    } catch {
      setStatus("We could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WorkspaceShell
      nav={{
        ctaLabel: "Request review",
        ctaPath: "/drafting/advocate-review",
        ctaClassName: "px-5 py-3 text-[13px]"
      }}
    >
      <Container size="wide" className="py-8">
        <div className="space-y-6">
          <div className="space-y-[10px]">
            <h1 className="font-display text-[34px] font-semibold text-ink">
              Advocate review
            </h1>
            <p className="text-[16px] leading-[1.6] text-muted">
              If your estate is complex or you want extra confidence, you can
              request a Kenyan advocate to review your draft before you sign.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <SectionCard
              title="When to consider review"
              subtitle="Examples of more complex estates."
            >
              <div className="space-y-1.5 text-[13px] text-ink">
                <p>• Multiple spouses or blended families</p>
                <p>• Cross-border property or businesses</p>
                <p>• High-value or disputed assets</p>
              </div>
            </SectionCard>
            <SectionCard
              title="What you will receive"
              subtitle="Clear feedback and corrections."
            >
              <div className="space-y-1.5 text-[13px] text-ink">
                <p>• Written review notes</p>
                <p>• Suggested language edits</p>
                <p>• Optional call to explain changes</p>
              </div>
            </SectionCard>
            <SectionCard
              title="Privacy safeguards"
              subtitle="Your information stays protected."
            >
              <div className="space-y-1.5 text-[13px] text-ink">
                <p>• Share only what is necessary</p>
                <p>• Advocate bound by confidentiality</p>
                <p>• You can withdraw your request</p>
              </div>
            </SectionCard>
          </div>

          <HelperCallout
            title="What happens after you request"
            body="We will confirm availability, share pricing, and connect you with a vetted advocate. No work begins without your approval."
          />

          <SectionCard title="Request review" subtitle="Tell us what kind of support you need.">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold text-ink">Full name</p>
                <Input
                  placeholder=""
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold text-ink">Email or phone</p>
                <Input
                  placeholder=""
                  value={form.contact}
                  onChange={(event) => handleChange("contact", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold text-ink">What do you want reviewed?</p>
                <Textarea
                  placeholder="Describe your complexity or questions"
                  value={form.notes}
                  onChange={(event) => handleChange("notes", event.target.value)}
                />
              </div>
              {status && <p className="text-[12px] text-muted">{status}</p>}
              <Button
                variant="primary"
                size="sm"
                className="px-5 py-3 text-[13px]"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Request advocate review"}
              </Button>
            </div>
          </SectionCard>
        </div>
      </Container>
    </WorkspaceShell>
  );
}
