"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMAND_QUESTIONS } from "@/lib/questions";
import type { DemandResult } from "@/types";
import { DemandResultView } from "@/components/DemandTest/DemandResultView";

const CATEGORIES = Array.from(new Set(DEMAND_QUESTIONS.map((q) => q.category)));

export default function DemandFounderTestPage() {
  const [ideaContext, setIdeaContext] = useState("");
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemandResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const question = DEMAND_QUESTIONS[currentQ];
  const progress = Math.round((currentQ / DEMAND_QUESTIONS.length) * 100);
  const isLast = currentQ === DEMAND_QUESTIONS.length - 1;
  const currentAnswer = answers[question?.id];
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== "";

  const handleAnswer = (value: number | string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentQ((prev) => prev + 1);
    } else {
      submitTest();
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  const submitTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const rawAnswers = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      }));
      const res = await fetch("/api/demand-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawAnswers, ideaContext }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setAnswers({});
    setCurrentQ(0);
    setIdeaContext("");
    setIdeaSubmitted(false);
  };

  if (result) {
    return <DemandResultView result={result} onReset={reset} />;
  }

  // Step 0: Idea context
  if (!ideaSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 glass border-b border-white/40">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-bold text-stone-900">
              Still<span className="text-gradient">Point</span>
            </Link>
            <Link href="/clarity-engine" className="text-sm text-stone-500 hover:text-brand-600 transition-colors">
              Clarity Engine →
            </Link>
          </div>
        </nav>
        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-16">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Demand Founder Test
            </div>
            <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
              Let's score your demand.
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed mb-2">
              12 questions across 6 demand signals. Takes about 5 minutes. No fluff — just the signals that separate ideas people buy from ideas people say sound great.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {CATEGORIES.map((cat) => (
                <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 mb-6">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Describe your idea in 1-2 sentences <span className="text-stone-400 font-normal">(optional but recommended)</span>
            </label>
            <p className="text-xs text-stone-400 mb-3">
              This helps the AI personalize your narrative results. Keep it plain and honest.
            </p>
            <textarea
              value={ideaContext}
              onChange={(e) => setIdeaContext(e.target.value)}
              placeholder="e.g. A B2B SaaS tool that automates compliance reporting for fintech startups. Target customer is the operations or compliance lead at a 20-100 person fintech."
              rows={3}
              className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 resize-none focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
            />
          </div>

          <button
            onClick={() => setIdeaSubmitted(true)}
            className="w-full py-4 bg-amber-500 text-white font-semibold text-base rounded-2xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Start the Test
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-stone-900">
            Still<span className="text-gradient">Point</span>
          </Link>
          <span className="text-sm text-stone-500">
            {currentQ + 1} of {DEMAND_QUESTIONS.length}
          </span>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="h-1 bg-stone-100">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium">
            {question.category}
          </span>
          <span className="text-xs text-stone-400">
            Question {currentQ + 1} of {DEMAND_QUESTIONS.length}
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="glass rounded-3xl p-8 mb-6">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-2 leading-snug">
            {question.question}
          </h2>
          {question.subtext && (
            <p className="text-stone-400 text-sm mb-6">{question.subtext}</p>
          )}
          {!question.subtext && <div className="mb-6" />}

          {/* Scale */}
          {question.type === "scale" && (
            <div>
              <div className="flex justify-between text-xs text-stone-400 mb-2">
                <span>{question.scaleLabels?.[0]}</span>
                <span>{question.scaleLabels?.[1]}</span>
              </div>
              <input
                type="range"
                min={question.scaleMin ?? 1}
                max={question.scaleMax ?? 10}
                value={currentAnswer !== undefined ? Number(currentAnswer) : 5}
                onChange={(e) => handleAnswer(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                {Array.from({ length: (question.scaleMax ?? 10) - (question.scaleMin ?? 1) + 1 }).map((_, i) => {
                  const val = (question.scaleMin ?? 1) + i;
                  return (
                    <span
                      key={val}
                      className={`text-xs ${
                        Number(currentAnswer) === val ? "text-amber-600 font-bold" : "text-stone-300"
                      }`}
                    >
                      {val}
                    </span>
                  );
                })}
              </div>
              {currentAnswer !== undefined && (
                <p className="text-center mt-4 text-2xl font-bold text-gradient">{Number(currentAnswer)}</p>
              )}
            </div>
          )}

          {/* Yes/No */}
          {question.type === "yesno" && (
            <div className="grid grid-cols-2 gap-4">
              {["yes", "no"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`py-4 rounded-2xl text-base font-semibold border-2 transition-all ${
                    currentAnswer === opt
                      ? opt === "yes"
                        ? "bg-green-500 border-green-500 text-white shadow-lg"
                        : "bg-red-400 border-red-400 text-white shadow-lg"
                      : "bg-white border-stone-200 text-stone-700 hover:border-amber-300"
                  }`}
                >
                  {opt === "yes" ? "✓  Yes" : "✗  No"}
                </button>
              ))}
            </div>
          )}

          {/* Choice */}
          {question.type === "choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-sm transition-all leading-relaxed ${
                    currentAnswer === opt
                      ? "bg-amber-50 border-amber-400 text-amber-900 font-medium"
                      : "bg-white border-stone-200 text-stone-700 hover:border-amber-200 hover:bg-amber-50/30"
                  }`}
                >
                  <span className="text-stone-400 text-xs mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-white text-stone-700 font-semibold text-sm rounded-xl hover:bg-stone-50 transition-all border border-stone-200"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!hasAnswer || loading}
            className="flex-1 py-3 bg-amber-500 text-white font-semibold text-sm rounded-xl hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scoring your demand...
              </>
            ) : isLast ? (
              "See My Results →"
            ) : (
              "Next →"
            )}
          </button>
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-8">
          {DEMAND_QUESTIONS.map((q, i) => (
            <button
              key={q.id}
              onClick={() => i <= currentQ && setCurrentQ(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentQ
                  ? "bg-amber-500 scale-125"
                  : answers[q.id] !== undefined
                  ? "bg-amber-300"
                  : "bg-stone-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



