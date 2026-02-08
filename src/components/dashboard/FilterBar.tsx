"use client";

import { useCallback } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { useDashboardStore } from "@/store/dashboard";
import type { DateRange, UserType } from "@/types/dashboard";

const dateRanges: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "12m", label: "12M" },
];

const userTypeOptions: { value: UserType; label: string; description: string }[] = [
  { value: "all", label: "All users", description: "All plans" },
  { value: "free", label: "Free", description: "Trial and free" },
  { value: "premium", label: "Premium", description: "Paid individual" },
  { value: "enterprise", label: "Enterprise", description: "Contracted" },
];

export function FilterBar() {
  const dateRange = useDashboardStore((state) => state.dateRange);
  const userType = useDashboardStore((state) => state.userType);
  const setDateRange = useDashboardStore((state) => state.setDateRange);
  const setUserType = useDashboardStore((state) => state.setUserType);

  const onDateChange = useCallback(
    (value: DateRange) => {
      setDateRange(value);
    },
    [setDateRange]
  );

  const onUserTypeChange = useCallback(
    (value: UserType) => {
      setUserType(value);
    },
    [setUserType]
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-slate-600">Date range</span>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
          {dateRanges.map((range) => (
            <Button
              key={range.value}
              size="sm"
              variant={dateRange === range.value ? "primary" : "ghost"}
              className={clsx(
                "h-8 px-3",
                dateRange === range.value
                  ? "shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
              onClick={() => onDateChange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      <Dropdown
        label={userTypeOptions.find((option) => option.value === userType)?.label ?? "User type"}
        items={userTypeOptions.map((option) => ({
          id: option.value,
          label: option.label,
          description: option.description,
          onSelect: () => onUserTypeChange(option.value),
        }))}
      />
    </div>
  );
}
