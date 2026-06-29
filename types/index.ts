export type DemandAnswer = {
  questionId: string;
  value: number;
  normalizedScore: number; // required
};

export type DemandResult = {
  score: number;
  tier: DemandTier;
};

export type DemandTier = "low" | "medium" | "high" | "strong" | "exceptional" | "emerging";


