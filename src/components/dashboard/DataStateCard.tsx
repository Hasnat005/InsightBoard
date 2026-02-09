"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, RefreshCw, ShieldAlert } from "lucide-react";
import type { Candidate } from "@/types/analytics";
import { Button } from "@/components/ui/Button";

type Status = "loading" | "success" | "empty" | "error";

type DataStateCardProps = {
  candidates: Candidate[];
};

export function DataStateCard({ candidates }: DataStateCardProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Candidate[]>([]);

  const loadData = (nextStatus?: Status) => {
    if (nextStatus === "error") {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      const resolved = candidates.length ? "success" : "empty";
      setStatus(resolved);
      setData(candidates);
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const resolved = candidates.length ? "success" : "empty";
      setStatus(resolved);
      setData(candidates);
    }, 800);

    return () => clearTimeout(timer);
  }, [candidates]);

  const subtitle = useMemo(() => {
    if (status === "loading") return "Fetching latest hiring activity.";
    if (status === "empty") return "No new candidates were added today.";
    if (status === "error") return "We could not load the activity feed.";
    return "Live activity captured from recruiting pipelines.";
  }, [status]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Live Activity</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex flex-nowrap items-center gap-2 sm:shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs"
            onClick={() => loadData()}
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="h-8 px-3 text-xs"
            onClick={() => loadData("error")}
          >
            <ShieldAlert className="size-3.5" aria-hidden="true" />
            Test error
          </Button>
        </div>
      </div>
      <div className="mt-6" aria-live="polite">
        {status === "loading" && (
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading updates...
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
            <AlertTriangle className="size-4" aria-hidden="true" />
            Something went wrong. Please retry or contact support.
          </div>
        )}
        {status === "empty" && (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            Activity feed is quiet. Encourage recruiters to log interview notes.
          </div>
        )}
        {status === "success" && (
          <ul className="space-y-3">
            {data.slice(0, 3).map((candidate) => (
              <li
                key={candidate.id}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                <span className="font-semibold text-slate-900">
                  {candidate.name}
                </span>{" "}
                advanced to <span className="font-semibold">{candidate.stage}</span>
                <span className="text-slate-500">
                  {" "}for {candidate.role}.
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}