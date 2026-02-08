"use client";

import { memo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { UsersSeriesPoint } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

export type UserDistributionPieProps = {
  data: UsersSeriesPoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const COLORS = ["#1f2937", "#6366f1", "#22c55e"];

const UserDistributionPieComponent = ({
  data,
  loading = false,
  error = null,
  onRetry,
}: UserDistributionPieProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>User Distribution</CardTitle>
          <p className="text-sm text-slate-500">
            Breakdown by subscription tier
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
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
            <span>{error}</span>
            {onRetry && (
              <Button size="sm" variant="outline" onClick={onRetry}>
                Retry
              </Button>
            )}
          </div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            No user distribution data available for this range.
          </div>
        )}
        {!loading && !error && data.length > 0 && (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="period"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="#ffffff"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${entry.period}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => {
                    const numeric = typeof value === "number" ? value : Number(value);
                    if (Number.isFinite(numeric)) {
                      return numeric.toLocaleString();
                    }
                    return String(value ?? "");
                  }}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.2)",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const UserDistributionPie = memo(UserDistributionPieComponent);
