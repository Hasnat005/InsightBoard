"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
      aria-label="Toggle theme"
    >
      <Sun className="hidden size-5 dark:inline-flex" aria-hidden="true" />
      <Moon className="inline-flex size-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
