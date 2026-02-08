"use client";

import { useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CandidatesCard } from "@/components/dashboard/CandidatesCard";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { DataStateCard } from "@/components/dashboard/DataStateCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { OrdersBarChart } from "@/components/charts/OrdersBarChart";
import { RevenueLineChart } from "@/components/charts/RevenueLineChart";
import { UserDistributionPie } from "@/components/charts/UserDistributionPie";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useDashboardStore } from "@/store/dashboard";

export function DashboardPage() {
  const data = useDashboardStore((state) => state.data);
  const loading = useDashboardStore((state) => state.loading);
  const error = useDashboardStore((state) => state.error);
  const dateRange = useDashboardStore((state) => state.dateRange);
  const userType = useDashboardStore((state) => state.userType);
  const fetchDashboardData = useDashboardStore((state) => state.fetchDashboardData);

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange, userType, fetchDashboardData]);

  const stats = data?.stats;
  const isInitialLoading = loading || !data;

  const updatedLabel = useMemo(() => {
    if (!stats?.updatedAt) return "Updating now";
    return new Date(stats.updatedAt).toLocaleString();
  }, [stats?.updatedAt]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <SectionHeader
          eyebrow="Overview"
          title="Hiring performance at a glance"
          description={`Updated ${updatedLabel}`}
          actions={
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
              Export report
            </button>
          }
        />

        <FilterBar />

        <KpiGrid items={stats?.kpis ?? []} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <ChartSection data={stats?.pipeline ?? []} />
          <DataStateCard candidates={stats?.candidates ?? []} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueLineChart
            data={data?.revenue ?? []}
            loading={isInitialLoading}
            error={error}
          />
          <OrdersBarChart
            data={data?.orders ?? []}
            loading={isInitialLoading}
            error={error}
          />
          <UserDistributionPie
            data={data?.users ?? []}
            loading={isInitialLoading}
            error={error}
          />
        </div>

        <CandidatesCard candidates={stats?.candidates ?? []} />
      </div>
    </DashboardLayout>
  );
}
