export function MarketingFooter() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-[1200px] rounded-2xl border border-border bg-card px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[360px] space-y-2">
            <p className="font-display text-lg font-semibold text-ink">WillGuide Kenya</p>
            <p className="text-[13px] text-muted">Kenya-first will drafting with calm guidance.</p>
            <p className="text-[13px] text-muted">
              Plain-English explanations, legal signing support, and privacy by default.
            </p>
          </div>
        </div>
        <div className="my-6 h-px w-full bg-border" />
        <div className="flex flex-col gap-2 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>(c) 2026 WillGuide Kenya</span>
          <span>Built for Kenyan families</span>
        </div>
      </div>
    </footer>
  );
}

