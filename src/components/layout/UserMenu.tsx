"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { clsx } from "clsx";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:scale-[0.99]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          AR
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs text-slate-500">Hiring Lead</span>
          <span className="block">Alex Rivera</span>
        </span>
        <ChevronDown className="size-4 text-slate-500" aria-hidden="true" />
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-hidden={!open}
        className={clsx(
          "absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <button
          role="menuitem"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
        >
          <User className="size-4" aria-hidden="true" />
          Profile
        </button>
        <button
          role="menuitem"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </button>
        <div className="my-1 border-t border-slate-200" />
        <button
          role="menuitem"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
