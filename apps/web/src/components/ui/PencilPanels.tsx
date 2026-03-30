import { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, MinusCircle } from "lucide-react";
import { cn } from "../../lib/cn";

type SectionCardProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  subtitle,
  children,
  className
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      <div className="space-y-1.5">
        <p className="font-display text-xl font-semibold text-ink">{title}</p>
        <p className="text-[13px] text-muted">{subtitle}</p>
      </div>
      {children && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

type SuccessPanelProps = {
  title: string;
  body: string;
  className?: string;
};

export function SuccessPanel({ title, body, className }: SuccessPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-success bg-success-soft p-4",
        className
      )}
    >
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <p className="mt-2 text-[13px] text-muted">{body}</p>
    </div>
  );
}

type WarningBannerProps = {
  title: string;
  body: string;
  className?: string;
};

export function WarningBanner({ title, body, className }: WarningBannerProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-warning bg-warning-soft p-4",
        className
      )}
    >
      <AlertTriangle className="mt-0.5 text-warning" size={20} strokeWidth={1.6} />
      <div className="space-y-1.5">
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="text-[13px] leading-[1.6] text-muted">{body}</p>
      </div>
    </div>
  );
}

type HelperCalloutProps = {
  title: string;
  body: string;
  className?: string;
};

export function HelperCallout({ title, body, className }: HelperCalloutProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-secondary p-4",
        className
      )}
    >
      <Info className="mt-0.5 text-primary" size={20} strokeWidth={1.6} />
      <div className="space-y-1.5">
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="text-[13px] leading-[1.6] text-muted">{body}</p>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  lines: string[];
  className?: string;
};

export function SummaryCard({ title, lines, className }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <div className="mt-2 space-y-1 text-[12px] text-muted">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

type ChecklistItem = {
  label: string;
  tone: "success" | "warning";
};

type ReviewChecklistProps = {
  title: string;
  items: ChecklistItem[];
  className?: string;
};

export function ReviewChecklist({
  title,
  items,
  className
}: ReviewChecklistProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-secondary p-4",
        className
      )}
    >
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.tone === "success" ? (
              <CheckCircle2 className="text-success" size={16} strokeWidth={1.6} />
            ) : (
              <AlertTriangle className="text-warning" size={16} strokeWidth={1.6} />
            )}
            <span className="text-[12px] text-ink">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type DocumentPreviewProps = {
  title: string;
  placeholder: string;
  className?: string;
};

export function DocumentPreview({
  title,
  placeholder,
  className
}: DocumentPreviewProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <div className="mt-2 flex h-[180px] items-center justify-center rounded-lg bg-secondary">
        <p className="text-[12px] text-muted">{placeholder}</p>
      </div>
    </div>
  );
}

type ErrorBannerProps = {
  title: string;
  body: string;
  className?: string;
};

export function ErrorBanner({ title, body, className }: ErrorBannerProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-error bg-error-soft p-4",
        className
      )}
    >
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <p className="mt-2 text-[13px] text-muted">{body}</p>
    </div>
  );
}

type EmptyStateCardProps = {
  title: string;
  body: string;
  className?: string;
};

export function EmptyStateCard({ title, body, className }: EmptyStateCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center",
        className
      )}
    >
      <MinusCircle className="text-muted" size={18} strokeWidth={1.6} />
      <p className="text-[13px] font-semibold text-ink">{title}</p>
      <p className="text-[12px] text-muted">{body}</p>
    </div>
  );
}

