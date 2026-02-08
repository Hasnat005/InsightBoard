import type { Candidate, Kpi, PipelinePoint } from "@/types/analytics";
import type {
  OrdersSeriesPoint,
  RevenueSeriesPoint,
  UsersSeriesPoint,
} from "@/types/api";

export type DateRange = "7d" | "30d" | "12m";
export type UserType = "all" | "free" | "premium" | "enterprise";

export type DashboardStats = {
  kpis: Kpi[];
  pipeline: PipelinePoint[];
  candidates: Candidate[];
  updatedAt: string;
};

export type DashboardData = {
  stats: DashboardStats;
  revenue: RevenueSeriesPoint[];
  orders: OrdersSeriesPoint[];
  users: UsersSeriesPoint[];
};
