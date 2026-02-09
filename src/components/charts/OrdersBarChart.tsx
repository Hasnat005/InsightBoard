"use client";

import { memo } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OrdersSeriesPoint } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

export type OrdersBarChartProps = {
  data: OrdersSeriesPoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const OrdersBarChartComponent = ({
  data,
  loading = false,
  error = null,
  onRetry,
}: OrdersBarChartProps) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle>Monthly Orders</CardTitle>
          <p className="text-sm text-slate-500">
            Confirmed orders by month
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" rounded="full" />
            <Skeleton className="h-64 w-full" rounded="lg" />
          </div>
        )}
        {!loading && error && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4"
          >
            <div className="flex items-start gap-3 text-rose-700">
              <AlertTriangle className="mt-0.5 size-4" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Unable to load orders</p>
                <p className="text-sm text-rose-600">{error}</p>
              </div>
            </div>
            {onRetry && (
              <Button size="sm" variant="outline" onClick={onRetry}>
                Retry
              </Button>
            )}
          </div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">No orders data yet</p>
            <p className="text-sm text-slate-500">
              Adjust the filters to load a different reporting window.
            </p>
          </div>
        )}
        {!loading && !error && data.length > 0 && (
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: 4, right: 24 }}>
                <XAxis
                  dataKey="period"
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
                  cursor={{ fill: "#f1f5f9" }}
                  labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                  itemStyle={{ color: "#0f172a" }}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.2)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#0f172a"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const OrdersBarChart = memo(OrdersBarChartComponent);
