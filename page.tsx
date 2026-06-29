"use client";

import { useState } from "react";

export default function Page() {
  const [clarityInput, setClarityInput] = useState({
    situation: "",
    challenge: "",
    desiredOutcome: "",
    context: "",
  });
  const [clarityResult, setClarityResult] = useState<any | null>(null);
  const [clarityLoading, setClarityLoading] = useState(false);

  const [demandAnswers, setDemandAnswers] = useState<Record<string, number | string>>({});
  const [demandResult, setDemandResult] = useState<any | null>(null);
  const [demandLoading, setDemandLoading] = useState(false);

  async function runClarity() {
    setClarityLoading(true);
    setClarityResult(null);
    try {
      const res = await fetch("/api/clarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clarityInput),
      });
      const data = await res.json();
      setClarityResult(data);
    } finally {
      setClarityLoading(false);
    }
  }

  async function runDemandTest() {
    setDemandLoading(true);
    setDemandResult(null);
    try {
      const rawAnswers = Object.entries(demandAnswers).map(([questionId, value]) => ({
        questionId,
        value,
      }));
      const res = await fetch("/api/demand-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawAnswers }),
      });
      const data = await res.json();
      setDemandResult(data);
    } finally {
      setDemandLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          StillPointOS
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
          Clarity for founders who build what matters.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300 text-lg">
          StillPoint equips demand‑driven founders with two focused tools:
          the <span className="font-medium text-sky-300">Clarity Engine</span> and the{" "}
          <span className="font-medium text-emerald-300">Demand Founder Test</span> —
          so you can cut through noise, validate ideas, and move with conviction.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 transition"
            onClick={() => {
              const el = document.getElementById("clarity-engine");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start with Clarity Engine
          </button>
          <button
            className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium hover:border-slate-400 transition"
            onClick={() => {
              const el = document.getElementById("demand-test");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Run Demand Founder Test
          </button>
        </div>
      </section>

      {/* Clarity Engine */}
      <section
        id="clarity-engine"
        className="mx-auto max-w-5xl px-6 pb-16 border-t border-slate-800 pt-10"
      >
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Clarity Engine</h2>
            <p className="mt-2 text-slate-300 max-w-xl text-sm">
              A structured prompt that turns your messy founder brain into a crisp diagnosis,
              root cause, and strategic path — in one pass.
            </p>
          </div>
          <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">
            Input → Diagnosis → Path
          </span>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Input */}
          <div className="space-y-4">
            {["situation", "challenge", "desiredOutcome", "context"].map((field) => (
              <label key={field} className="block text-sm font-medium text-slate-200">
                {field === "desiredOutcome"
                  ? "Desired outcome"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
                <textarea
                  className="mt-1 w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  rows={field === "context" ? 2 : 3}
                  value={(clarityInput as any)[field]}
                  onChange={(e) =>
                    setClarityInput((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                />
              </label>
            ))}
            <button
              onClick={runClarity}
              disabled={clarityLoading}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60"
            >
              {clarityLoading ? "Running Clarity Engine…" : "Run Clarity Engine"}
            </button>
          </div>

          {/* Output */}
          <div className="space-y-4">
            {!clarityResult && (
              <p className="text-sm text-slate-400">
                Your structured diagnosis will appear here.
              </p>
            )}
            {clarityResult && (
              <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm">
                {Object.entries(clarityResult).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    {Array.isArray(value) ? (
                      <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-200">
                        {value.map((v: any, i: number) => (
                          <li key={i}>{typeof v === "string" ? v : v.action}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-slate-200 whitespace-pre-line">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Demand Founder Test */}
      <section
        id="demand-test"
        className="mx-auto max-w-5xl px-6 pb-20 border-t border-slate-800 pt-10"
      >
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Demand Founder Test</h2>
            <p className="mt-2 text-slate-300 max-w-xl text-sm">
              Score your demand signal across urgency, specificity, willingness to pay,
              evidence, and founder–market fit.
            </p>
          </div>
          <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">
            0–100 score · tiered
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={runDemandTest}
            disabled={demandLoading}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
          >
            {demandLoading ? "Scoring demand…" : "Run Demand Founder Test"}
          </button>
        </div>

        {demandResult && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 text-sm">
            <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Overall score
              </p>
              <p className="mt-1 text-3xl font-semibold">
                {demandResult.score}
                <span className="text-sm text-slate-400"> / 100</span>
              </p>
              <p className="text-slate-300">
                {demandResult.title} — {demandResult.tagline}
              </p>
              <p className="mt-2 text-slate-400">{demandResult.summary}</p>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Categories
              </p>
              <ul className="mt-1 space-y-1">
                {demandResult.categoryBreakdown?.map(
                  (c: { category: string; score: number; label: string }, i: number) => (
                    <li key={i} className="flex justify-between text-slate-200">
                      <span>{c.category}</span>
                      <span className="text-slate-400">
                        {c.score}/100 · {c.label}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
