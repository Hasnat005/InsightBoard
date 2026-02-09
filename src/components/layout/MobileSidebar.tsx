"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { navigation } from "@/data/navigation";
import { useUiStore } from "@/store/ui";

export function MobileSidebar() {
  const pathname = usePathname();
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen);
  const closeMobileNav = useUiStore((state) => state.closeMobileNav);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isMobileNavOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isMobileNavOpen]);

  useEffect(() => {
    // Lock body scroll when the drawer is open.
    document.body.classList.toggle("overflow-hidden", isMobileNavOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileNavOpen]);

  return (
    <div
      className={clsx(
        // Disable hit-testing when closed to keep the dashboard clickable.
        "fixed inset-0 z-40 lg:hidden",
        isMobileNavOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isMobileNavOpen}
    >
      <button
        className={clsx(
          // Backdrop for the drawer.
          "absolute inset-0 bg-slate-900/40 transition-opacity",
          isMobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMobileNav}
        aria-label="Close navigation"
      />
      <div
        className={clsx(
          // Slide-in drawer on tablet/mobile.
          "relative z-50 h-full w-[85%] max-w-xs bg-white shadow-xl transition-transform duration-300 sm:w-72",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeMobileNav();
          }
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
              IB
            </div>
            <span className="text-sm font-semibold text-slate-900">
              InsightBoard
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={closeMobileNav}
            className="min-h-[44px] min-w-[44px] rounded-md p-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:scale-95"
            aria-label="Close navigation"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="px-3 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={closeMobileNav}
                    className={clsx(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:translate-x-0.5 active:scale-[0.99]",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="px-4 pb-4 text-xs text-slate-400">© 2026 InsightBoard</div>
      </div>
    </div>
  );
}
