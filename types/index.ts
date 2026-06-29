export type DemandAnswer = {
  questionId: string;
  value: number;
};

export type DemandResult = {
  score: number;
  tier: DemandTier;
};

export type DemandTier = "low" | "medium" | "high";
