import { create } from "zustand";
import type { DashboardData, DateRange, UserType } from "@/types/dashboard";
import { fetchDashboardData } from "@/services/dashboard";

export type DashboardState = {
  dateRange: DateRange;
  userType: UserType;
  loading: boolean;
  error: string | null;
  data: DashboardData | null;
  setDateRange: (range: DateRange) => void;
  setUserType: (type: UserType) => void;
  fetchDashboardData: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dateRange: "30d",
  userType: "all",
  loading: false,
  error: null,
  data: null,
  setDateRange: (range) => set({ dateRange: range }),
  setUserType: (type) => set({ userType: type }),
  fetchDashboardData: async () => {
    const { dateRange, userType } = get();
    set({ loading: true, error: null });
    try {
      const data = await fetchDashboardData(dateRange, userType);
      set({ data, loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load dashboard data";
      set({ error: message, loading: false });
    }
  },
}));
