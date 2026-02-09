import { clsx } from "clsx";

export type SectionHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        // Stack on small screens to keep the title readable.
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex w-full items-center gap-2 sm:w-auto">{actions}</div>
      )}
    </div>
  );
}
