"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export type DropdownItem = {
  id: string;
  label: string;
  description?: string;
  onSelect?: () => void;
  disabled?: boolean;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
};

export function Dropdown({ label, items, align = "right", className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const alignmentClasses = align === "right" ? "sm:right-0 sm:left-auto" : "sm:left-0";

  return (
    <div className={clsx("relative inline-flex w-full sm:w-auto", className)}>
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 sm:w-auto"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="size-4 text-slate-500" aria-hidden="true" />
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-hidden={!open}
        className={clsx(
          "absolute z-40 mt-2 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg transition",
          "left-0 right-0 w-auto max-w-[calc(100vw-1rem)]",
          "sm:left-auto sm:right-auto sm:w-auto sm:min-w-[200px] sm:max-w-[calc(100vw-2rem)]",
          alignmentClasses,
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="max-h-72 overflow-auto">
          {items.map((item) => (
          <button
            key={item.id}
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              item.onSelect?.();
              setOpen(false);
            }}
            className={clsx(
              "flex w-full flex-col rounded-lg px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
              item.disabled
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-700 hover:bg-slate-100"
            )}
          >
            <span className="font-medium">{item.label}</span>
            {item.description && (
              <span className="text-xs text-slate-500">{item.description}</span>
            )}
          </button>
          ))}
        </div>
      </div>
    </div>
  );
}
