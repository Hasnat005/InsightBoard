import type { DashboardData, DashboardStats, DateRange, UserType } from "@/types/dashboard";
import { kpis, pipelineData, recentCandidates } from "@/data/analytics";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

export async function fetchDashboardData(
  dateRange: DateRange,
  userType: UserType
): Promise<DashboardData> {
  const multiplier = rangeMultiplier[dateRange] * userTypeMultiplier[userType];

  await new Promise((resolve) => setTimeout(resolve, 650));

  const stats: DashboardStats = {
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

  const revenueBase = [82, 88, 91, 98, 104, 112, 120, 128, 136, 144, 152, 164];
  const ordersBase = [620, 700, 680, 720, 760, 820, 880, 910, 940, 980, 1020, 1100];
  const usersBase = [
    { period: "Free", value: 42000 },
    { period: "Premium", value: 15800 },
    { period: "Enterprise", value: 3200 },
  ];

  return {
    stats,
    revenue: revenueBase.map((value, index) => ({
      period: monthLabels[index] ?? `M${index + 1}`,
      value: Math.round(value * 1000 * multiplier),
    })),
    orders: ordersBase.map((value, index) => ({
      period: monthLabels[index] ?? `M${index + 1}`,
      value: Math.round(value * multiplier),
    })),
    users: usersBase.map((entry) => ({
      ...entry,
      value: Math.round(entry.value * multiplier),
    })),
  };
}
