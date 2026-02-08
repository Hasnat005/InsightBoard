import type {
  OrdersResponse,
  RevenueResponse,
  StatsResponse,
  UsersResponse,
} from "@/types/api";
import { fetcher } from "@/services/api";

export const dashboardApi = {
  getStats: (signal?: AbortSignal) => fetcher<StatsResponse["data"]>("/stats", signal),
  getRevenue: (signal?: AbortSignal) =>
    fetcher<RevenueResponse["data"]>("/revenue", signal),
  getOrders: (signal?: AbortSignal) =>
    fetcher<OrdersResponse["data"]>("/orders", signal),
  getUsers: (signal?: AbortSignal) =>
    fetcher<UsersResponse["data"]>("/users", signal),
};
