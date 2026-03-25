import { Card } from "../../components/ui/Card";

export default function MobileDrafting() {
  return (
    <div className="mx-auto w-full max-w-[390px] bg-paper">
      <div className="flex h-[62px] items-center justify-center text-sm text-ink">9:41</div>
      <div className="space-y-4 px-5 pb-8">
        <Card size="md" className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Step 2 of 10
          </p>
          <p className="font-display text-2xl text-ink">Family and dependants</p>
          <p className="text-xs text-muted">Tell us about the people who depend on you.</p>
        </Card>
        <Card size="md" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Spouse</p>
          <p className="text-xs text-muted">If you have a spouse, add their details. If not, you can skip.</p>
        </Card>
        <Card size="md" variant="secondary" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Why we ask</p>
          <p className="text-xs text-muted">
            Clear family details help your executor avoid confusion and reduce disputes.
          </p>
        </Card>
        <Card size="md" className="space-y-2">
          <p className="text-xs font-semibold text-ink">Need to pause?</p>
          <p className="text-xs text-muted">
            Your draft is saved automatically. You can return anytime from the same device.
          </p>
        </Card>
        <div className="flex items-center justify-between">
          <button className="rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-ink">
            Back
          </button>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-paper">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
