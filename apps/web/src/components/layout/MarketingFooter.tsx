export function MarketingFooter() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-[1200px] rounded-2xl border border-border bg-card px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[320px] space-y-2">
            <p className="font-display text-lg font-semibold text-ink">Esheria Wills</p>
            <p className="text-[13px] text-muted">Guided will drafting for Kenyan families.</p>
            <p className="text-[13px] text-muted">
              Clear guidance for Kenyan succession planning and signing.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 text-[13px] text-muted">
            <div className="min-w-[160px] space-y-2">
              <p className="text-[13px] font-semibold text-ink">Resources</p>
              <p>Signing guide</p>
              <p>Eligibility</p>
            </div>
            <div className="min-w-[160px] space-y-2">
              <p className="text-[13px] font-semibold text-ink">Legal</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
        <div className="my-6 h-px w-full bg-border" />
        <div className="flex flex-col gap-2 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>(c) 2026 Esheria Wills</span>
          <span>Kenya-first digital will drafting.</span>
        </div>
      </div>
    </footer>
  );
}

