import { DemandTier } from "../types/index";
export const demandSummaries: Record<DemandTier, {
  title: string;
    tagline: string;
  summary: string;
}> = {
  low: {
    title: "Low Demand",
    tagline: "Minimal traction",
    summary: "Demand is currently low and may require repositioning or refinement.",
  },
  medium: {
    title: "Medium Demand",
    tagline: "Growing interest",
    summary: "Demand is moderate and shows potential for expansion.",
  },
  high: {
    title: "High Demand",
    tagline: "Strong traction",
    summary: "Demand is high and indicates strong market alignment.",
  },
  strong: {
    title: "Strong Demand",
    tagline: "Solid momentum",
    summary: "Demand is strong and signals readiness for scaling.",
  },
  exceptional: {
    title: "Exceptional Demand",
    tagline: "Breakout potential",
    summary: "Demand is exceptional and indicates a standout opportunity.",
  },
  emerging: {
    title: "Emerging Demand",
    tagline: "Early signals",
    summary: "Demand is emerging and may grow with targeted effort.",
  },
  weak: {
    title: "Weak Demand",
    tagline: "Limited traction",
    summary: "Demand is weak and may require significant repositioning.",
  },
};
