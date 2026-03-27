import { ReactNode } from "react";
import { draftingSteps, getStepById, getStepIndex } from "../../lib/draftingSteps";
import { navigate } from "../../lib/navigation";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/cn";

export function DraftingShell({
  stepId,
  title,
  description,
  children,
  footer,
  aside
}: {
  stepId: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
}) {
  // Legacy: DraftingShell is used only by archived stepper pages.
  const step = getStepById(stepId);
  const stepIndex = getStepIndex(step.path);

  return (
    <div className="bg-paper px-6 pb-24 pt-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-ink">Your progress</p>
            <ol className="mt-4 space-y-2 text-xs text-muted">
              {draftingSteps.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "text-left",
                      item.id === stepId ? "text-primary" : "text-muted"
                    )}
                  >
                    {index + 1}. {item.label}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <section className="rounded-xl bg-paper">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Step {stepIndex + 1} of {draftingSteps.length}
                </p>
                <h1 className="font-display text-3xl text-ink">{title}</h1>
                <p className="max-w-[680px] text-[14px] text-muted">{description}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Badge tone="success">Saved just now</Badge>
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="rounded-xl border border-border bg-card p-5">
                {children}
              </div>
              {aside && <div className="space-y-3">{aside}</div>}
            </div>

            {footer && <div className="mt-6">{footer}</div>}
          </section>
        </div>
      </div>
    </div>
  );
}
