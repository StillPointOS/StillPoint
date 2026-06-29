export type DemandAnswer = {
  questionId: string;
  value: number;
  normalizedScore?: number; // ← add this
};

export type DemandResult = {
  score: number;
  tier: DemandTier;
};

export type DemandTier = "low" | "medium" | "high";
