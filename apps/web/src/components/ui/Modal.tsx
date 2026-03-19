import { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Modal({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8">
      <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-6 shadow-glass">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">{title}</h3>
          <button
            onClick={onClose}
            className={cn(
              "rounded-full border border-border px-3 py-1 text-xs font-semibold text-ink/70 hover:text-ink"
            )}
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-sm text-ink/70">{children}</div>
      </div>
    </div>
  );
}
