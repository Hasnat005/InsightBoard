import type { Candidate, Kpi, PipelinePoint } from "@/types/analytics";

export const kpis: Kpi[] = [
  {
    id: "time-to-hire",
    label: "Time to Hire",
    value: "24 days",
    trend: "down",
    delta: "-3.2 days",
  },
  {
    id: "offer-acceptance",
    label: "Offer Acceptance",
    value: "82%",
    trend: "up",
    delta: "+4.1%",
  },
  {
    id: "pipeline-velocity",
    label: "Pipeline Velocity",
    value: "3.1x",
    trend: "up",
    delta: "+0.4x",
  },
  {
    id: "quality-of-hire",
    label: "Quality of Hire",
    value: "4.6/5",
    trend: "flat",
    delta: "+0.0",
  },
];

export const pipelineData: PipelinePoint[] = [
  { week: "Wk 1", screened: 42, interviewed: 18, offered: 5 },
  { week: "Wk 2", screened: 48, interviewed: 22, offered: 7 },
  { week: "Wk 3", screened: 38, interviewed: 20, offered: 6 },
  { week: "Wk 4", screened: 55, interviewed: 26, offered: 9 },
  { week: "Wk 5", screened: 50, interviewed: 24, offered: 8 },
  { week: "Wk 6", screened: 60, interviewed: 30, offered: 11 },
];

export const recentCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Avery Chen",
    role: "Senior Frontend Engineer",
    stage: "Interview",
    score: 4.7,
    location: "New York, NY",
  },
  {
    id: "cand-2",
    name: "Diego Romero",
    role: "Product Designer",
    stage: "Offer",
    score: 4.9,
    location: "Austin, TX",
  },
  {
    id: "cand-3",
    name: "Priya Shah",
    role: "Data Scientist",
    stage: "Screen",
    score: 4.3,
    location: "Toronto, ON",
  },
  {
    id: "cand-4",
    name: "Liam O'Connor",
    role: "Engineering Manager",
    stage: "Hired",
    score: 4.8,
    location: "Seattle, WA",
  },
];
