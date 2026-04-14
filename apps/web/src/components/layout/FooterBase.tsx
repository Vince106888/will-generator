export function FooterBase() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-[1440px] rounded-xl border border-border bg-card px-7 py-7">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[280px] space-y-2">
            <p className="font-display text-[18px] font-semibold text-ink">
              Draft Will Document
            </p>
            <p className="text-[12px] text-muted">
              Guided will drafting for Kenyan families.
            </p>
            <p className="text-[12px] text-muted">
              Clear guidance for Kenyan succession planning and signing.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2 text-[12px]">
              <p className="font-semibold text-ink">Resources</p>
              <p className="text-muted">Signing guide</p>
              <p className="text-muted">Eligibility</p>
            </div>
            <div className="space-y-2 text-[12px]">
              <p className="font-semibold text-ink">Legal</p>
              <p className="text-muted">Privacy</p>
              <p className="text-muted">Terms</p>
            </div>
          </div>
        </div>
        <div className="my-5 h-px w-full bg-border" />
        <div className="flex flex-col gap-2 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Will Drafting Platform</span>
          <span>Kenya-first digital will drafting.</span>
        </div>
      </div>
    </footer>
  );
}
