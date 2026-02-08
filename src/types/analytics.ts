export type Kpi = {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  delta: string;
};

export type PipelinePoint = {
  week: string;
  screened: number;
  interviewed: number;
  offered: number;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: "Screen" | "Interview" | "Offer" | "Hired";
  score: number;
  location: string;
};
