"use client";

import { useState } from "react";
import Link from "next/link";
import type { ClarityInput, ClarityResult } from "@/types";

const PLACEHOLDER = {
  situation: "I'm a solo founder 8 months into building a B2B SaaS tool for operations teams. I have 3 paying customers and ~$4k MRR but growth has stalled for 60 days.",
  challenge: "I can't figure out whether to double down on product (customers ask for features I haven't built) or sales (I'm not doing outbound). I'm spending all my time on support and small improvements and not moving the needle.",
  desiredOutcome: "A clear decision on where to focus the next 90 days that I can actually commit to and execute without second-guessing.",
  context: "I'm pre-seed, no co-founder, moderate runway (~14 months). The 3 customers are all warm referrals.",
};

export default function ClarityEnginePage() {
  const [form, setForm] = useState<ClarityInput>({
    situation: "",
    challenge: "",
    desiredOutcome: "",
    context: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [charCounts, setCharCounts] = useState({ situation: 0, challenge: 0, desiredOutcome: 0 });

  const handleChange = (field: keyof ClarityInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field !== "context") {
      setCharCounts((prev) => ({ ...prev, [field]: value.length }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/clarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    setForm({ situation: "", challenge: "", desiredOutcome: "", context: "" });
    setCharCounts({ situation: 0, challenge: 0, desiredOutcome: 0 });
  };

  const isValid = form.situation.length >= 20 && form.challenge.length >= 20 && form.desiredOutcome.length >= 10;

  if (result) {
    return <ClarityResult result={result} onReset={reset} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-stone-900">
            Still<span className="text-gradient">Point</span>
          </Link>
          <Link href="/demand-founder-test" className="text-sm text-stone-500 hover:text-brand-600 transition-colors">
            Demand Founder Test →
          </Link>
        </div>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Clarity Engine
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
            What's your challenge?
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Describe your situation honestly. The more specific you are, the sharper your analysis. This isn't a chatbot — it's a strategic diagnostic.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Situation */}
          <div className="glass rounded-2xl p-6">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Your situation <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-stone-400 mb-3">
              Where are you right now? Stage, traction, context. No need to spin it.
            </p>
            <textarea
              value={form.situation}
              onChange={(e) => handleChange("situation", e.target.value)}
              placeholder={PLACEHOLDER.situation}
              rows={4}
              className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-stone-400">Minimum 20 characters</span>
              <span className={`text-xs ${charCounts.situation >= 20 ? "text-brand-500" : "text-stone-400"}`}>
                {charCounts.situation} chars
              </span>
            </div>
          </div>

          {/* Challenge */}
          <div className="glass rounded-2xl p-6">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              The core challenge <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-stone-400 mb-3">
              What's the actual problem? What decisions can't you make? Where are you stuck?
            </p>
            <textarea
              value={form.challenge}
              onChange={(e) => handleChange("challenge", e.target.value)}
              placeholder={PLACEHOLDER.challenge}
              rows={4}
              className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-stone-400">Be honest — the more real, the more useful</span>
              <span className={`text-xs ${charCounts.challenge >= 20 ? "text-brand-500" : "text-stone-400"}`}>
                {charCounts.challenge} chars
              </span>
            </div>
          </div>

          {/* Desired Outcome */}
          <div className="glass rounded-2xl p-6">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Your desired outcome <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-stone-400 mb-3">
              What does "solved" look like? What decision, clarity, or action would make this worth it?
            </p>
            <textarea
              value={form.desiredOutcome}
              onChange={(e) => handleChange("desiredOutcome", e.target.value)}
              placeholder={PLACEHOLDER.desiredOutcome}
              rows={3}
              className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-xs ${charCounts.desiredOutcome >= 10 ? "text-brand-500" : "text-stone-400"}`}>
                {charCounts.desiredOutcome} chars
              </span>
            </div>
          </div>

          {/* Context */}
          <div className="glass rounded-2xl p-6">
            <label className="block text-sm font-semibold text-stone-800 mb-1">
              Additional context <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <p className="text-xs text-stone-400 mb-3">
              Constraints, runway, team size, past attempts, market — anything that shapes the problem.
            </p>
            <textarea
              value={form.context}
              onChange={(e) => handleChange("context", e.target.value)}
              placeholder={PLACEHOLDER.context}
              rows={3}
              className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm placeholder-stone-300 resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-4 bg-brand-600 text-white font-semibold text-base rounded-2xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running your diagnostic...
              </>
            ) : (
              <>
                Run Clarity Diagnostic
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {!isValid && (
            <p className="text-center text-sm text-stone-400">
              Fill in the three required fields to unlock your diagnostic.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Inline Result Component ────────────────────────────────────────────────

function ClarityResult({ result, onReset }: { result: ClarityResult; onReset: () => void }) {
  const scoreColor =
    result.confidenceScore >= 8
      ? "text-green-600"
      : result.confidenceScore >= 6
      ? "text-amber-600"
      : "text-red-500";

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-stone-900">
            Still<span className="text-gradient">Point</span>
          </Link>
          <button
            onClick={onReset}
            className="text-sm text-stone-500 hover:text-brand-600 transition-colors flex items-center gap-1"
          >
            ← New diagnostic
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full px-6 py-12 space-y-6">
        {/* Headline card */}
        <div className="glass rounded-3xl p-8 border border-brand-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-400">Diagnostic confidence</span>
              <span className={`text-sm font-bold ${scoreColor}`}>{result.confidenceScore}/10</span>
            </div>
          </div>
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">Core Challenge</p>
          <h2 className="font-display text-2xl font-bold text-stone-900 leading-snug">{result.headline}</h2>
        </div>

        {/* Diagnosis + Root Cause */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Diagnosis</p>
            <p className="text-stone-700 text-sm leading-relaxed">{result.diagnosis}</p>
          </div>
          <div className="glass rounded-2xl p-6 border border-red-100 bg-red-50/30">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">Root Cause</p>
            <p className="text-stone-800 text-sm font-medium leading-relaxed">{result.rootCause}</p>
          </div>
        </div>

        {/* Strategic Path */}
        <div className="glass rounded-2xl p-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">Strategic Path</p>
          <ol className="space-y-3">
            {result.strategicPath.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-stone-700 text-sm leading-relaxed">{step.replace(/^Step \d+:\s*/i, "")}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Immediate Actions */}
        <div className="glass rounded-2xl p-6 border border-green-100">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">Immediate Actions — Next 72 Hours</p>
          <div className="space-y-4">
            {result.immediateActions.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-stone-800 text-sm font-medium">{item.action}</p>
                  <p className="text-stone-500 text-xs mt-1">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch-outs */}
        <div className="glass rounded-2xl p-6 border border-amber-100 bg-amber-50/20">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-4">Watch-Outs</p>
          <ul className="space-y-2">
            {result.watchouts.map((w, i) => (
              <li key={i} className="flex gap-2 items-start text-sm text-stone-700">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Reframe */}
        <div className="bg-stone-900 rounded-2xl p-6">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Reframe</p>
          <p className="text-white font-display text-xl font-medium leading-snug italic">"{result.reframe}"</p>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-stone-600 mb-4 text-sm">Ready to validate the demand behind your direction?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/demand-founder-test"
              className="px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-all"
            >
              Take the Demand Founder Test →
            </Link>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-white text-stone-700 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-all border border-stone-200"
            >
              Run another diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

