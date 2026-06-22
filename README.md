import type { DemandQuestion } from "@/types";

export const DEMAND_QUESTIONS: DemandQuestion[] = [
  // ── URGENCY ─────────────────────────────────────────────────────────────
  {
    id: "urgency-1",
    category: "Urgency",
    question: "How urgently do your target customers need to solve this problem right now?",
    subtext: "Think about the pain frequency — is this a daily frustration or an occasional inconvenience?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ["Not urgent at all", "Burning, urgent problem"],
    weight: 3,
  },
  {
    id: "urgency-2",
    category: "Urgency",
    question: "Have you directly observed or heard customers describe this as a top-3 priority problem?",
    type: "yesno",
    weight: 3,
  },

  // ── SPECIFICITY ──────────────────────────────────────────────────────────
  {
    id: "specificity-1",
    category: "Specificity",
    question: "How precisely can you define who your ideal customer is?",
    subtext: "e.g., 'series A SaaS founders with 10-50 employees' is specific; 'startups' is not",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ["Very broad / unclear", "Precise, specific profile"],
    weight: 2,
  },
  {
    id: "specificity-2",
    category: "Specificity",
    question: "How well do you understand the specific workflow or moment where this problem occurs?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ["I'm guessing", "I know the exact moment"],
    weight: 2,
  },

  // ── WILLINGNESS TO PAY ───────────────────────────────────────────────────
  {
    id: "wtp-1",
    category: "Willingness to Pay",
    question: "Have any potential customers expressed willingness to pay for a solution — without you asking leading questions?",
    type: "yesno",
    weight: 3,
  },
  {
    id: "wtp-2",
    category: "Willingness to Pay",
    question: "How confident are you in what price point customers will pay?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ["No idea", "Tested and validated price"],
    weight: 2,
  },

  // ── EXISTING ALTERNATIVES ────────────────────────────────────────────────
  {
    id: "alternatives-1",
    category: "Existing Alternatives",
    question: "What are customers currently doing to solve this problem?",
    type: "choice",
    options: [
      "Doing nothing — they live with the pain",
      "Using a terrible workaround or manual process",
      "Using an expensive or complex tool that doesn't quite fit",
      "Using a direct competitor that mostly solves it",
    ],
    weight: 2,
  },
  {
    id: "alternatives-2",
    category: "Existing Alternatives",
    question: "How dissatisfied are customers with their current solution?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: ["Very satisfied", "Extremely frustrated"],
    weight: 2,
  },

  // ── EVIDENCE ─────────────────────────────────────────────────────────────
  {
    id: "evidence-1",
    category: "Evidence",
    question: "How many real conversations have you had with people who have this problem?",
    type: "choice",
    options: [
      "0 — I haven't talked to anyone yet",
      "1-5 conversations",
      "6-20 conversations",
      "20+ conversations with strong signal",
    ],
    weight: 3,
  },
  {
    id: "evidence-2",
    category: "Evidence",
    question: "Do you have any hard evidence of demand (letters of intent, pre-orders, paid pilots, waitlist signups)?",
    type: "yesno",
    weight: 3,
  },

  // ── MARKET SIZE ──────────────────────────────────────────────────────────
  {
    id: "market-1",
    category: "Market Size",
    question: "How large is the addressable market you're targeting?",
    type: "choice",
    options: [
      "Niche — fewer than 10,000 potential customers",
      "Small — 10K to 100K potential customers",
      "Mid-size — 100K to 1M potential customers",
      "Large — over 1M potential customers",
    ],
    weight: 1,
  },

  // ── FOUNDER FIT ──────────────────────────────────────────────────────────
  {
    id: "fit-1",
    category: "Founder–Market Fit",
    question: "How would you describe your relationship to this problem?",
    type: "choice",
    options: [
      "I've researched it but never experienced it personally",
      "I've experienced it as a user but have no domain expertise",
      "I have domain expertise but am a step removed from the core buyer",
      "I am or was the exact customer — deep expertise and empathy",
    ],
    weight: 2,
  },
];

