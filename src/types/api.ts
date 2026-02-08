import type { DashboardStats } from "@/types/dashboard";

export type ApiSuccess<T> = {
  data: T;
  requestId: string;
};

export type ApiError = {
  message: string;
  status: number;
  requestId?: string;
};

export type RevenueSeriesPoint = {
  period: string;
  value: number;
};

export type OrdersSeriesPoint = {
  period: string;
  value: number;
};

export type UsersSeriesPoint = {
  period: string;
  value: number;
};

export type StatsResponse = ApiSuccess<DashboardStats>;
export type RevenueResponse = ApiSuccess<RevenueSeriesPoint[]>;
export type OrdersResponse = ApiSuccess<OrdersSeriesPoint[]>;
export type UsersResponse = ApiSuccess<UsersSeriesPoint[]>;
