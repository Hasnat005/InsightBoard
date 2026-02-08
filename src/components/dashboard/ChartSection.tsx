"use client";

import dynamic from "next/dynamic";
import type { PipelinePoint } from "@/types/analytics";

const ChartCard = dynamic(
  () =>
    import("@/components/dashboard/ChartCard").then((mod) => mod.ChartCard),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-8 w-40 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-6 h-64 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    ),
  }
);

type ChartSectionProps = {
  data: PipelinePoint[];
};

export function ChartSection({ data }: ChartSectionProps) {
  return <ChartCard data={data} />;
}
