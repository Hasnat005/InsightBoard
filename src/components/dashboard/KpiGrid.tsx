import type { Kpi } from "@/types/analytics";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

type KpiGridProps = {
  items: Kpi[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export function KpiGrid({ items, loading = false, error = null, onRetry }: KpiGridProps) {
  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`kpi-skeleton-${index}`}>
            <CardContent className="p-5">
              <Skeleton className="h-4 w-24" rounded="full" />
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-8 w-20" rounded="lg" />
                <Skeleton className="h-6 w-16" rounded="full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-semibold text-rose-600">Unable to load KPIs</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
          {onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-slate-700">No KPI data yet</p>
          <p className="text-sm text-slate-500">
            Data will appear once a reporting window is selected.
          </p>
        </CardContent>
      </Card>
    );
  }

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
