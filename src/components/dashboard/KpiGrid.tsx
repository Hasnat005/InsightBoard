import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { clsx } from "clsx";
import type { Kpi } from "@/types/analytics";

type KpiGridProps = {
  items: Kpi[];
};

const trendStyles = {
  up: "text-emerald-600",
  down: "text-rose-600",
  flat: "text-slate-500",
} as const;

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => {
        const Icon =
          kpi.trend === "up"
            ? ArrowUpRight
            : kpi.trend === "down"
              ? ArrowDownRight
              : Minus;

        return (
          <article
            key={kpi.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <div className="mt-3 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                {kpi.value}
              </h2>
              <div
                className={clsx(
                  "flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium",
                  trendStyles[kpi.trend]
                )}
              >
                <Icon className="size-3" aria-hidden="true" />
                {kpi.delta}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
