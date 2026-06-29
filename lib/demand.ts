import type { DemandAnswer, DemandResult, DemandTier } from "@/types";
import { DEMAND_QUESTIONS } from "./questions";

// Normalize answers to 0-10 scale
export function normalizeAnswer(questionId: string, value: number | string): number {
  const question = DEMAND_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return 5;

  if (question.type === "yesno") {
    return value === "yes" ? 10 : 0;
  }

  if (question.type === "scale") {
    return Number(value); // already 1-10
  }

  if (question.type === "choice" && question.options) {
    const idx = question.options.indexOf(value as string);
    if (idx === -1) return 0;
    // Map option index to score:
    // Index 0 = worst, last = best
    return Math.round((idx / (question.options.length - 1)) * 10);
  }

  return 5;
}

// Compute overall demand score (0–100)
export function computeScore(answers: DemandAnswer[]): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const answer of answers) {
    const question = DEMAND_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;
    weightedSum += answer.normalizedScore * question.weight;
    totalWeight += question.weight * 10; // max possible contribution
  }

  if (totalWeight === 0) return 0;
  return Math.round((weightedSum / totalWeight) * 100);
}

// Score by category
function scoreByCategory(answers: DemandAnswer[]) {
  const categories: Record<string, { sum: number; totalWeight: number }> = {};

  for (const answer of answers) {
    const question = DEMAND_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;
    if (!categories[question.category]) {
      categories[question.category] = { sum: 0, totalWeight: 0 };
    }
    categories[question.category].sum += answer.normalizedScore * question.weight;
    categories[question.category].totalWeight += question.weight * 10;
  }

  return Object.entries(categories).map(([category, data]) => {
    const score = Math.round((data.sum / data.totalWeight) * 100);
    return {
      category,
      score,
      label: categoryLabel(score),
    };
  });
}

function categoryLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Developing";
  if (score >= 25) return "Weak";
  return "Critical gap";
}

function tierFromScore(score: number): DemandTier {
  if (score >= 80) return "exceptional";
  if (score >= 60) return "strong";
  if (score >= 35) return "emerging";
  return "weak";
}

const TIER_META: Record<DemandTier, { title: string; tagline: string; summary: string }> = {
  exceptional: {
    title: "Exceptional Demand Signal",
    tagline: "Build with confidence — the market is speaking clearly.",
    summary:
      "Your demand signals are unusually strong. You've done the work: real conversations, validated pain, and clear willingness to pay. The risk now is execution speed — your window may close if you slow down. Don't over-engineer the first version.",
  },
  strong: {
    title: "Strong Demand Signal",
    tagline: "The foundation is solid — now sharpen your edge.",
    summary:
      "You have meaningful demand evidence and a clear problem. A few signals need strengthening — likely around pricing confidence or customer specificity — but you have enough to move. Focus your next sprint on closing the remaining gaps.",
  },
  emerging: {
    title: "Emerging Demand Signal",
    tagline: "There's something here — but it needs more proof.",
    summary:
      "You have real intuition and some evidence, but gaps remain in critical areas. This is not a stop sign — it's a research agenda. The questions you haven't fully answered are exactly where your next 30 days should go.",
  },
  weak: {
    title: "Weak Demand Signal",
    tagline: "Pause before building — validate before committing resources.",
    summary:
      "Your current demand signals are too thin to build with confidence. This is actually good news: you're catching it early. The most common founder mistake is building on assumption. Use this as your roadmap for the conversations you need to have.",
  },
};

export function buildResult(answers: DemandAnswer[]): DemandResult {
  const score = computeScore(answers);
  const tier = tierFromScore(score);
  const { title, tagline, summary } = TIER_META[tier];
  const categoryBreakdown = scoreByCategory(answers);

  // Strengths = categories with score >= 70
  const strengths = categoryBreakdown
    .filter((c) => c.score >= 70)
    .map((c) => `${c.category}: strong signal (${c.score}/100)`);

  // Critical gaps = categories with score < 40
  const criticalGaps = categoryBreakdown
    .filter((c) => c.score < 40)
    .map((c) => `${c.category}: needs immediate attention (${c.score}/100)`);

  const recommendation =
    tier === "exceptional"
      ? "Move fast. Prioritize shipping a narrow v1 and getting paying customers within 60 days."
      : tier === "strong"
      ? "Sharpen your weakest signal area, then move into customer development for a paid pilot."
      : tier === "emerging"
      ? "Run 15 more customer discovery interviews focused on your critical gap categories before building anything."
      : "Stop building. Run 20 structured problem interviews, validate willingness to pay explicitly, and retest in 60 days.";

  const nextSteps =
    tier === "exceptional"
      ? [
          "Define your v1 scope ruthlessly — cut everything not core to the pain",
          "Set a 60-day deadline to your first paying customer",
          "Identify your top 3 distribution channels and start testing them now",
        ]
      : tier === "strong"
      ? [
          "Close your weakest signal area with 5-10 targeted conversations",
          "Design and offer a paid pilot to 2-3 customers this month",
          "Build a simple landing page to test messaging conversion",
        ]
      : tier === "emerging"
      ? [
          "Run 15 structured problem interviews in the next 4 weeks",
          "Test 3 different framings of the problem to find the sharpest language",
          "Look for existing demand proxies: communities, forums, competitor reviews",
        ]
      : [
          "Stop building. Schedule 20 problem interviews in the next 30 days",
          "Use Mom Test principles — ask about their life, not your idea",
          "Focus on understanding the current workflow before proposing solutions",
        ];

  return {
    score,
    tier,
    title,
    tagline,
    summary,
    categoryBreakdown,
    strengths,
    criticalGaps,
    recommendation,
    nextSteps,
  };
}

