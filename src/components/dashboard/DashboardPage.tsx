"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CandidatesCard } from "@/components/dashboard/CandidatesCard";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { DataStateCard } from "@/components/dashboard/DataStateCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
const RevenueLineChart = dynamic(
  () => import("@/components/charts/RevenueLineChart").then((m) => m.RevenueLineChart),
  { ssr: false }
);
const OrdersBarChart = dynamic(
  () => import("@/components/charts/OrdersBarChart").then((m) => m.OrdersBarChart),
  { ssr: false }
);
const UserDistributionPie = dynamic(
  () => import("@/components/charts/UserDistributionPie").then((m) => m.UserDistributionPie),
  { ssr: false }
);
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
    const updatedAt = stats?.updatedAt;
    if (!updatedAt) return "Updating now";
    const timestamp = Date.parse(updatedAt);
    if (Number.isNaN(timestamp)) return "Updating now";
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(timestamp);
  }, [stats?.updatedAt]);

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col gap-6 sm:gap-8">
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

        <KpiGrid
          items={stats?.kpis ?? []}
          loading={isInitialLoading}
          error={error}
          onRetry={fetchDashboardData}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <ChartSection data={stats?.pipeline ?? []} />
          <DataStateCard candidates={stats?.candidates ?? []} />
        </div>

        {/* Stack charts on tablet/mobile and switch to grid on desktop. */}
        <div className="grid gap-5 lg:grid-cols-3">
          <RevenueLineChart
            data={data?.revenue ?? []}
            loading={isInitialLoading}
            error={error}
            onRetry={fetchDashboardData}
          />
          <OrdersBarChart
            data={data?.orders ?? []}
            loading={isInitialLoading}
            error={error}
            onRetry={fetchDashboardData}
          />
          <UserDistributionPie
            data={data?.users ?? []}
            loading={isInitialLoading}
            error={error}
            onRetry={fetchDashboardData}
          />
        </div>

        <CandidatesCard candidates={stats?.candidates ?? []} />
      </div>
    </DashboardLayout>
  );
}
