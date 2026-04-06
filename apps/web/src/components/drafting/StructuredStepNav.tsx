import { navigate } from "../../lib/navigation";

const STRUCTURED_STEPS = [
  { id: "personal", label: "Personal details", path: "/drafting/structured/personal-details" },
  { id: "executors", label: "Executors", path: "/drafting/structured/executors" },
  { id: "guardians", label: "Guardianship", path: "/drafting/structured/guardians" },
  { id: "assets", label: "Assets + beneficiaries", path: "/drafting/structured/assets" },
  { id: "wishes", label: "Special wishes", path: "/drafting/structured/wishes" },
  { id: "review", label: "Review & signing", path: "/drafting/review-result" }
];

export function StructuredStepNav({ currentPath }: { currentPath: string }) {
  const currentIndex = Math.max(
    0,
    STRUCTURED_STEPS.findIndex((step) => step.path === currentPath)
  );
  const progress =
    STRUCTURED_STEPS.length > 0
      ? ((currentIndex + 1) / STRUCTURED_STEPS.length) * 100
      : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        <span>Step {currentIndex + 1} of {STRUCTURED_STEPS.length}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 rounded-full border border-border bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex flex-wrap gap-2 text-[12px]">
        {STRUCTURED_STEPS.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isComplete = index < currentIndex;
          const canNavigate = index <= currentIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => canNavigate && navigate(step.path)}
              disabled={!canNavigate}
              className={[
                "rounded-full border px-3 py-1.5 transition",
                isCurrent ? "border-primary bg-secondary text-ink" : "",
                isComplete ? "border-primary/40 text-ink" : "",
                !isCurrent && !isComplete ? "border-border text-muted" : "",
                !canNavigate ? "cursor-not-allowed opacity-60" : "hover:border-primary"
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {index + 1}. {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
