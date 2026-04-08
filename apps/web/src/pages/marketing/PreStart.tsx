import { MarketingShell } from "../../components/layout/MarketingShell";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { navigate } from "../../lib/navigation";
import prestartIllustration from "../../assets/prestart-illustration.svg";

export default function PreStart() {
  return (
    <MarketingShell>
      <Container className="pb-24 pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4">
            <p className="font-display text-3xl text-ink">Before you begin (Legacy)</p>
            <p className="text-[15px] leading-7 text-muted">
              Legacy page retained for archive reference. Use Entry Choice and Existing Will Gate to begin.
            </p>
            <p className="text-sm leading-6 text-muted">
              Most people finish in about 20-30 minutes, but taking your time is perfectly fine.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_12px_30px_rgba(31,36,41,0.08)]">
            <img
              src={prestartIllustration}
              alt="A calm desk with documents, books, and a plant"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card size="lg" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Estimated time</p>
            <p className="text-[15px] font-semibold text-primary">20-30 minutes</p>
          </Card>
          <Card size="lg" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Progress saved</p>
            <p className="text-[15px] font-semibold text-primary">Autosave is on</p>
          </Card>
          <Card size="lg" className="space-y-2">
            <p className="text-xs font-semibold text-ink">Pace</p>
            <p className="text-[15px] font-semibold text-primary">Pause anytime</p>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-3">
            <div>
              <p className="text-base font-semibold text-ink">What to expect</p>
              <p className="text-sm text-muted">A calm, guided process with room to pause.</p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Guided questions, one section at a time</li>
              <li>Clear review before a draft is created</li>
              <li>Progress is saved so you can return later</li>
              <li>Help text explains why we ask certain details</li>
            </ul>
          </Card>
          <Card size="lg" className="space-y-3">
            <div>
              <p className="text-base font-semibold text-ink">What you may want to prepare</p>
              <p className="text-sm text-muted">Gather basics if available - perfection not required.</p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>National ID or passport details</li>
              <li>Spouse, children, or dependants (if any)</li>
              <li>Executors, guardians, and beneficiaries</li>
              <li>Main assets (land, bank/SACCO, M-Pesa, vehicles)</li>
              <li>You do not need every detail perfect to begin</li>
            </ul>
          </Card>
        </div>

        <Card size="lg" variant="warning" className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-ink">Important legal note</p>
          <p className="text-sm leading-6 text-muted">
            This creates a draft will. It becomes legally effective only after proper signing and witnessing under
            Kenyan law. We will explain those steps clearly before you finish.
          </p>
          <p className="text-sm leading-6 text-muted">
            Family, marriage, children, property, and faith or cultural considerations may shape your decisions -
            this process gives you space to reflect.
          </p>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card size="lg" className="space-y-3">
            <div>
              <p className="text-base font-semibold text-ink">Privacy and care</p>
              <p className="text-sm text-muted">Your information is handled carefully.</p>
            </div>
            <p className="text-sm leading-6 text-muted">
              We treat the information you provide with care. Your progress is saved, and your details are not shared
              casually. You stay in control of what you submit and can review everything before finalizing.
            </p>
          </Card>
          <Card size="lg" className="space-y-3">
            <div>
              <p className="text-base font-semibold text-ink">Inclusive guidance</p>
              <p className="text-sm text-muted">Respectful of different lives and families.</p>
            </div>
            <p className="text-sm leading-6 text-muted">
              Families and life situations differ - some are simple, others more complex. This experience is designed
              to support different ages, family structures, and backgrounds with calm, respectful guidance.
            </p>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink">
            When you are ready, you can begin drafting or preview how the process works.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => navigate("/entry-choice")}>
              Go to entry choice
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate("/how-it-works")}>
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </MarketingShell>
  );
}
