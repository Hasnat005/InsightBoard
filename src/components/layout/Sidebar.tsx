"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { useUiStore } from "@/store/ui";
import { clsx } from "clsx";

export function Sidebar() {
  const pathname = usePathname();
  const isCollapsed = useUiStore((state) => state.isSidebarCollapsed);

  return (
    <aside
      className={clsx(
        "hidden border-r border-slate-200 bg-white md:flex md:flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
      aria-label="Primary"
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm transition hover:shadow-md">
          IB
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">
              InsightBoard
            </span>
            <span className="text-xs text-slate-500">Hiring Analytics</span>
          </div>
        )}
      </div>
      <nav className="flex-1 px-3" aria-label="Dashboard">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={clsx(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:translate-x-0.5 active:scale-[0.99]",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    isCollapsed && "justify-center"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span className={clsx(isCollapsed && "sr-only")}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-4 py-4 text-xs text-slate-400">
        {!isCollapsed && "© 2026 InsightBoard"}
      </div>
    </aside>
  );
}
