"use client";

import { Bell, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useUiStore } from "@/store/ui";
import { UserMenu } from "@/components/layout/UserMenu";
import { Container } from "@/components/ui/Container";

export function Header() {
  const isSidebarCollapsed = useUiStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const toggleMobileNav = useUiStore((state) => state.toggleMobileNav);
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container className="py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              className="min-h-[44px] min-w-[44px] rounded-md p-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:scale-95 lg:hidden"
              onClick={toggleMobileNav}
              aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileNavOpen}
            >
              {/* Mobile drawer toggle for tablet and below. */}
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <button
              className="hidden rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:scale-95 lg:inline-flex"
              onClick={toggleSidebar}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {/* Desktop-only collapse control. */}
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="size-5" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="size-5" aria-hidden="true" />
              )}
            </button>
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Hiring Analytics
              </p>
              <h1 className="truncate text-lg font-semibold text-slate-900">
                Executive Summary
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:scale-95"
              aria-label="View notifications"
            >
              <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-500" />
              <Bell className="size-5" aria-hidden="true" />
            </button>
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
