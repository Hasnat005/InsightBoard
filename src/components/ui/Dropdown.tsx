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

  return (
    <div className={clsx("relative inline-flex", className)}>
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
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
          "absolute z-40 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg transition",
          align === "right" ? "right-0" : "left-0",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
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
              "flex w-full flex-col rounded-lg px-3 py-2 text-left transition",
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
  );
}
