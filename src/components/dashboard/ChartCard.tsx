"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PipelinePoint } from "@/types/analytics";

const COLORS = {
  screened: "#0f172a",
  interviewed: "#6366f1",
  offered: "#22c55e",
};

type ChartCardProps = {
  data: PipelinePoint[];
};

export function ChartCard({ data }: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Pipeline Flow</h2>
          <p className="text-sm text-slate-500">
            Weekly candidate progression across stages
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full" style={{ background: COLORS.screened }} />
            Screened
          </span>
          <span className="flex items-center gap-1">
            <span
              className="size-2 rounded-full"
              style={{ background: COLORS.interviewed }}
            />
            Interviewed
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full" style={{ background: COLORS.offered }} />
            Offered
          </span>
        </div>
      </div>
      <div className="mt-6 h-56 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 24 }}>
            <XAxis
              dataKey="week"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <Tooltip
              cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              itemStyle={{ color: "#0f172a" }}
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e2e8f0",
                boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.2)",
              }}
            />
            <Line
              type="monotone"
              dataKey="screened"
              stroke={COLORS.screened}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="interviewed"
              stroke={COLORS.interviewed}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="offered"
              stroke={COLORS.offered}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
