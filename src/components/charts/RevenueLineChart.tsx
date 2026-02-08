"use client";

import { memo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenueSeriesPoint } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export type RevenueLineChartProps = {
  data: RevenueSeriesPoint[];
  loading?: boolean;
  error?: string | null;
};

const formatValue = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const RevenueLineChartComponent = ({
  data,
  loading = false,
  error = null,
}: RevenueLineChartProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Monthly Revenue</CardTitle>
          <p className="text-sm text-slate-500">
            Net new revenue across the last 12 months
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" rounded="full" />
            <Skeleton className="h-64 w-full" rounded="lg" />
          </div>
        )}
        {!loading && error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 4, right: 24 }}>
                <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                  formatter={(value) => formatValue(Number(value))}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.2)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const RevenueLineChart = memo(RevenueLineChartComponent);
