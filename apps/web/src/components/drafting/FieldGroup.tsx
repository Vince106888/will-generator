import { ReactNode } from "react";

export function FieldGroup({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-ink">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
