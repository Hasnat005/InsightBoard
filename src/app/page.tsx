import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CandidatesCard } from "@/components/dashboard/CandidatesCard";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { DataStateCard } from "@/components/dashboard/DataStateCard";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { kpis, pipelineData, recentCandidates } from "@/data/analytics";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Overview
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Hiring performance at a glance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Updated today at 9:42 AM · Data source: ATS + HRIS
            </p>
          </div>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Export report
          </button>
        </div>

        <KpiGrid items={kpis} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <ChartSection data={pipelineData} />
          <DataStateCard candidates={recentCandidates} />
        </div>

        <CandidatesCard candidates={recentCandidates} />
      </div>
    </DashboardLayout>
  );
}
