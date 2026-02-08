import type { Kpi } from "@/types/analytics";
import { KpiCard } from "@/components/dashboard/KpiCard";

type KpiGridProps = {
  items: Kpi[];
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => (
        <KpiCard
          key={kpi.id}
          title={kpi.label}
          value={kpi.value}
          change={kpi.delta}
          trend={kpi.trend === "down" ? "down" : "up"}
        />
      ))}
    </section>
  );
}
