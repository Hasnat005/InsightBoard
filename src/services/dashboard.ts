import type { DashboardStats, DateRange, UserType } from "@/types/dashboard";
import { kpis, pipelineData, recentCandidates } from "@/data/analytics";

const rangeMultiplier: Record<DateRange, number> = {
  "7d": 1,
  "30d": 1.2,
  "12m": 1.6,
};

const userTypeMultiplier: Record<UserType, number> = {
  all: 1,
  free: 0.7,
  premium: 1.1,
  enterprise: 1.4,
};

function scaleValue(value: string, multiplier: number) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return value;

  if (value.includes("$")) {
    return `$${(numeric * multiplier).toFixed(2)}M`;
  }
  if (value.includes("%")) {
    return `${(numeric * multiplier).toFixed(2)}%`;
  }
  if (value.includes("x")) {
    return `${(numeric * multiplier).toFixed(1)}x`;
  }
  return Math.round(numeric * multiplier).toLocaleString();
}

export async function fetchDashboardStats(
  dateRange: DateRange,
  userType: UserType
): Promise<DashboardStats> {
  const multiplier = rangeMultiplier[dateRange] * userTypeMultiplier[userType];

  await new Promise((resolve) => setTimeout(resolve, 650));

  return {
    kpis: kpis.map((kpi) => ({
      ...kpi,
      value: scaleValue(kpi.value, multiplier),
    })),
    pipeline: pipelineData.map((point) => ({
      ...point,
      screened: Math.round(point.screened * multiplier),
      interviewed: Math.round(point.interviewed * multiplier),
      offered: Math.round(point.offered * multiplier),
    })),
    candidates: recentCandidates,
    updatedAt: new Date().toISOString(),
  };
}
