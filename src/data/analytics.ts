import type { Candidate, Kpi, PipelinePoint } from "@/types/analytics";

export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Revenue",
    value: "$1.28M",
    trend: "up",
    delta: "+12.4%",
  },
  {
    id: "users",
    label: "Users",
    value: "48,920",
    trend: "up",
    delta: "+6.8%",
  },
  {
    id: "orders",
    label: "Orders",
    value: "9,473",
    trend: "down",
    delta: "-2.1%",
  },
  {
    id: "conversion-rate",
    label: "Conversion Rate",
    value: "4.32%",
    trend: "up",
    delta: "+0.6%",
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
