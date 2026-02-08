import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { Card, CardContent } from "@/components/ui/Card";
import type { Kpi } from "@/types/analytics";

const trendStyles: Record<Exclude<Kpi["trend"], "flat">, string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
};

export type KpiCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export function KpiCard({ title, value, change, trend }: KpiCardProps) {
  const Icon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-slate-500">{title}</p>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <h3 className="text-2xl font-semibold text-slate-900">{value}</h3>
          <div
            className={clsx(
              "flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold",
              trendStyles[trend]
            )}
            aria-label={`Change ${change}`}
          >
            <Icon className="size-3" aria-hidden="true" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
