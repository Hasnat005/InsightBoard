import type { Candidate, Kpi, PipelinePoint } from "@/types/analytics";

export type DateRange = "7d" | "30d" | "12m";
export type UserType = "all" | "free" | "premium" | "enterprise";

export type DashboardStats = {
  kpis: Kpi[];
  pipeline: PipelinePoint[];
  candidates: Candidate[];
  updatedAt: string;
};
