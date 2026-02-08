import {
  BarChart3,
  Briefcase,
  Building2,
  Gauge,
  LayoutGrid,
  Users,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const navigation: NavItem[] = [
  { id: "overview", label: "Overview", href: "/", icon: LayoutGrid },
  { id: "pipeline", label: "Pipeline", href: "/pipeline", icon: BarChart3 },
  { id: "roles", label: "Roles", href: "/roles", icon: Briefcase },
  { id: "candidates", label: "Candidates", href: "/candidates", icon: Users },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: Gauge },
  { id: "teams", label: "Teams", href: "/teams", icon: Building2 },
];
