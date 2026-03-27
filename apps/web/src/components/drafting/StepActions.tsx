import { draftingSteps } from "../../lib/draftingSteps";
import { navigate } from "../../lib/navigation";
import { Button } from "../ui/Button";

export function StepActions({
  currentPath,
  primaryLabel = "Continue",
  onPrimaryClick
}: {
  currentPath: string;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
}) {
  // Legacy: StepActions is used only by archived stepper pages.
  const index = draftingSteps.findIndex((step) => step.path === currentPath);
  const prev = index > 0 ? draftingSteps[index - 1] : null;
  const next = index < draftingSteps.length - 1 ? draftingSteps[index + 1] : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => prev && navigate(prev.path)}
        disabled={!prev}
        className="w-full sm:w-auto"
      >
        Back
      </Button>
      {next && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => (onPrimaryClick ? onPrimaryClick() : navigate(next.path))}
          className="w-full sm:w-auto"
        >
          {primaryLabel}
        </Button>
      )}
    </div>
  );
}
