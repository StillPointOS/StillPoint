export const DEMAND_QUESTIONS = [
  {
    id: "problem_specificity",
    category: "Problem Clarity",
    type: "scale",
    weight: 4,
    prompt: "How specifically can you articulate the customer's problem?",
  },
  {
    id: "pain_intensity",
    category: "Problem Clarity",
    type: "scale",
    weight: 4,
    prompt: "How intense is the pain or frustration associated with this problem?",
  },
  {
    id: "frequency",
    category: "Problem Clarity",
    type: "scale",
    weight: 3,
    prompt: "How frequently does the customer experience this problem?",
  },

  {
    id: "customer_specificity",
    category: "Customer Definition",
    type: "scale",
    weight: 4,
    prompt: "How clearly defined is your target customer segment?",
  },
  {
    id: "access_to_customers",
    category: "Customer Definition",
    type: "scale",
    weight: 3,
    prompt: "How easy is it for you to reach and talk to these customers?",
  },

  {
    id: "validation_interviews",
    category: "Validation Evidence",
    type: "scale",
    weight: 5,
    prompt: "How many structured validation interviews have you completed?",
  },
  {
    id: "signal_strength",
    category: "Validation Evidence",
    type: "scale",
    weight: 4,
    prompt: "How strong were the demand signals in those conversations?",
  },

  {
    id: "willingness_to_pay",
    category: "Willingness to Pay",
    type: "choice",
    weight: 5,
    options: ["No", "Maybe", "Yes"],
    prompt: "Have customers explicitly expressed willingness to pay?",
  },
  {
    id: "pricing_confidence",
    category: "Willingness to Pay",
    type: "scale",
    weight: 4,
    prompt: "How confident are you in your pricing model?",
  },

  {
    id: "market_size",
    category: "Market Evidence",
    type: "scale",
    weight: 3,
    prompt: "How large is the reachable market segment you're targeting?",
  },
  {
    id: "competitor_presence",
    category: "Market Evidence",
    type: "scale",
    weight: 2,
    prompt: "Are there existing competitors solving this problem?",
  },
  {
    id: "demand_proxies",
    category: "Market Evidence",
    type: "yesno",
    weight: 3,
    prompt: "Are there strong demand proxies (forums, reviews, communities)?",
  },
];
