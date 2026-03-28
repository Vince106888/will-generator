import { ReactNode } from "react";
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
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-[18px] w-[18px] text-warning"
        fill="none"
      >
        <path
          d="M12 3l9 16H3l9-16z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 9v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
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
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-[18px] w-[18px] text-primary"
        fill="none"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 10v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
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
              <svg
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] text-success"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 12.5l2.5 2.5L16 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] text-warning"
                fill="none"
              >
                <path
                  d="M12 3l9 16H3l9-16z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 9v5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
              </svg>
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
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-muted"
        fill="none"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8.5 12.5h7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-[13px] font-semibold text-ink">{title}</p>
      <p className="text-[12px] text-muted">{body}</p>
    </div>
  );
}
