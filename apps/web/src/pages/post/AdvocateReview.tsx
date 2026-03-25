import { Container } from "../../components/layout/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { FieldGroup } from "../../components/drafting/FieldGroup";
import { navigate } from "../../lib/navigation";
import { useDraftingData } from "../../lib/drafting";
import { STORAGE_KEYS } from "../../lib/storage";
import { api } from "../../lib/api";
import { useMemo, useState } from "react";

const reviewOptions = [
  {
    title: "Light review",
    body: "Quick check for completeness and signing guidance."
  },
  {
    title: "Full advocate review",
    body: "Detailed review for complex estates, minors, or multiple households."
  }
];

export default function AdvocateReview() {
  const { data, update } = useDraftingData();
  const [form, setForm] = useState({
    name: data.legalName || "",
    email: data.email || "",
    phone: data.phone || "",
    county: data.county || "",
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
    if (!form.email) {
      setStatus("Please provide an email so we can contact you.");
      setSubmitting(false);
      return;
    }
    try {
      await api.post(`/api/v1/wills/${willId}/lead`, {
        email: form.email,
        metadata: {
          source: "advocate-review",
          name: form.name,
          phone: form.phone,
          county: form.county,
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
    <div className="pb-24 pt-12">
      <Container className="max-w-[1440px]">
        <div className="space-y-3">
          <p className="font-display text-3xl text-ink">Advocate review</p>
          <p className="max-w-[880px] text-[15px] text-muted">
            If you want professional support, request a review. We will connect you with a Kenyan advocate who can help
            you finalize the draft confidently.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Card size="lg" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Choose the type of review</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {reviewOptions.map((option) => (
                  <div key={option.title} className="rounded-xl border border-border bg-paper p-4">
                    <p className="text-sm font-semibold text-ink">{option.title}</p>
                    <p className="text-xs text-muted">{option.body}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card size="lg" className="space-y-4">
              <p className="text-sm font-semibold text-ink">Request details</p>
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup label="Full name">
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Email address">
                  <Input
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="Phone number">
                  <Input
                    placeholder="07xx xxx xxx"
                    value={form.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                  />
                </FieldGroup>
                <FieldGroup label="County">
                  <Input
                    placeholder="e.g., Nairobi"
                    value={form.county}
                    onChange={(event) => handleChange("county", event.target.value)}
                  />
                </FieldGroup>
              </div>
              <FieldGroup label="Anything the advocate should know?" hint="Optional, but helpful for complex cases.">
                <Textarea
                  placeholder="Describe any unique family or asset situations."
                  className="min-h-[120px]"
                  value={form.notes}
                  onChange={(event) => handleChange("notes", event.target.value)}
                />
              </FieldGroup>
              {status && <p className="text-xs text-muted">{status}</p>}
              <Button variant="primary" size="sm" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Sending..." : "Request review"}
              </Button>
            </Card>
          </div>

          <div className="space-y-4">
            <Card size="md" className="space-y-2">
              <p className="text-xs font-semibold text-ink">What happens next</p>
              <p className="text-xs text-muted">
                We will review your request within one business day and introduce you to an advocate if needed.
              </p>
            </Card>
            <Card size="md" variant="secondary" className="space-y-2">
              <p className="text-xs font-semibold text-ink">Cost guidance</p>
              <p className="text-xs text-muted">
                Advocate fees vary by complexity. We confirm pricing before any work begins.
              </p>
            </Card>
            <Callout tone="info">
              You can still sign without an advocate review. This service is optional and designed for peace of mind.
            </Callout>
            <Button variant="secondary" size="sm" onClick={() => navigate("/drafting/export-options")}>
              Back to export options
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
