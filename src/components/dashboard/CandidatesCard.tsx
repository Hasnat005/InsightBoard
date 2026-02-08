import { memo } from "react";
import type { Candidate } from "@/types/analytics";

const stageStyles: Record<Candidate["stage"], string> = {
  Screen: "bg-slate-100 text-slate-600",
  Interview: "bg-indigo-100 text-indigo-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Hired: "bg-slate-900 text-white",
};

type CandidatesCardProps = {
  candidates: Candidate[];
};

function CandidatesCardComponent({ candidates }: CandidatesCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Recent Candidates</h2>
          <p className="text-sm text-slate-500">
            Active profiles prioritized by hiring teams
          </p>
        </div>
        <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300">
          View all
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <div>
              <p className="font-medium text-slate-900">{candidate.name}</p>
              <p className="text-sm text-slate-500">
                {candidate.role} · {candidate.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">
                {candidate.score.toFixed(1)}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[candidate.stage]}`}
              >
                {candidate.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const CandidatesCard = memo(CandidatesCardComponent);
