"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STATS = [
  { value: "94%", label: "of founders who complete the Demand Test pivot or sharpen their idea within 30 days" },
  { value: "3 min", label: "average time to a Clarity Engine breakthrough" },
  { value: "12 signals", label: "analyzed in the Demand Founder Test" },
];

const TESTIMONIALS = [
  {
    quote: "The Clarity Engine asked three questions and surfaced the exact thing I'd been circling for six months.",
    name: "Danielle R.",
    role: "Founder, Waymark Health",
  },
  {
    quote: "I came in thinking my demand problem was a marketing problem. The Demand Founder Test showed me it was a positioning problem. Night and day difference.",
    name: "Marcus T.",
    role: "Co-Founder, Fieldstone Labs",
  },
  {
    quote: "StillPoint feels like a strategist who already knows your business. The output is sharp, honest, and actually useful.",
    name: "Priya S.",
    role: "Founder, Loopline AI",
  },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-stone-900">
            Still<span className="text-gradient">Point</span>
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/clarity-engine"
              className="text-sm text-stone-600 hover:text-brand-600 transition-colors"
            >
              Clarity Engine
            </Link>
            <Link
              href="/demand-founder-test"
              className="text-sm text-stone-600 hover:text-brand-600 transition-colors"
            >
              Demand Test
            </Link>
            <Link
              href="/demand-founder-test"
              className="text-sm px-4 py-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-8">
            <span className="pulse-dot" />
            AI-powered clarity for founders
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6">
            Build from{" "}
            <span className="text-gradient">real demand.</span>
            <br />
            Move with conviction.
          </h1>

          <p className="text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            StillPoint gives founders two precision tools — the{" "}
            <strong className="text-stone-700 font-medium">Clarity Engine</strong> to diagnose your exact challenge, and the{" "}
            <strong className="text-stone-700 font-medium">Demand Founder Test</strong> to score your demand signals before you build.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demand-founder-test"
              className="group px-8 py-4 bg-brand-600 text-white text-base font-semibold rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:shadow-xl hover:shadow-brand-300 hover:-translate-y-0.5"
            >
              Take the Demand Founder Test
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
            <Link
              href="/clarity-engine"
              className="px-8 py-4 bg-white text-stone-800 text-base font-semibold rounded-2xl hover:bg-stone-50 transition-all border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Open the Clarity Engine
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.value} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <p className="text-sm text-stone-500 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-stone-900 mb-4">Two tools. One still point.</h2>
            <p className="text-stone-500 text-lg max-w-xl mx-auto">
              Each tool is engineered for founders who are done spinning and ready to make sharp, confident decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Clarity Engine */}
            <div className="glass rounded-3xl p-8 border border-brand-100 hover:border-brand-300 transition-all hover:shadow-xl hover:shadow-brand-100 group">
              <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">StillPoint Clarity Engine</h3>
              <p className="text-stone-500 mb-6 leading-relaxed">
                Describe your situation, challenge, and desired outcome. The Clarity Engine runs a deep diagnostic and returns a root-cause analysis, strategic path, and immediate action plan — in under a minute.
              </p>
              <ul className="space-y-2 mb-8">
                {["Root-cause diagnosis", "Strategic path with checkpoints", "Immediate action steps with rationale", "Critical watch-outs", "Reframing lens"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/clarity-engine"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all"
              >
                Open Clarity Engine <span>→</span>
              </Link>
            </div>

            {/* Demand Founder Test */}
            <div className="glass rounded-3xl p-8 border border-gold-400/20 hover:border-gold-400/50 transition-all hover:shadow-xl hover:shadow-amber-100 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">Demand Founder Test</h3>
              <p className="text-stone-500 mb-6 leading-relaxed">
                A 12-signal scoring assessment that measures the real strength of your market demand before you build. Get a scored breakdown across urgency, specificity, willingness to pay, and more.
              </p>
              <ul className="space-y-2 mb-8">
                {["12 demand signals scored", "Weighted scoring engine", "Category breakdowns", "Demand tier rating", "AI-generated narrative + next steps"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/demand-founder-test"
                className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all"
              >
                Start the Test <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white text-center mb-14">
            What founders say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
                <p className="text-stone-300 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-stone-500 text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-stone-900 mb-4">
            Ready to find your still point?
          </h2>
          <p className="text-stone-500 text-lg mb-10">
            Start with the Demand Founder Test to validate your signals, or go straight to the Clarity Engine to break through your current challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demand-founder-test"
              className="px-8 py-4 bg-brand-600 text-white text-base font-semibold rounded-2xl hover:bg-brand-700 transition-all shadow-lg"
            >
              Take the Demand Founder Test →
            </Link>
            <Link
              href="/clarity-engine"
              className="px-8 py-4 bg-white text-stone-800 text-base font-semibold rounded-2xl hover:bg-stone-50 transition-all border border-stone-200 shadow-sm"
            >
              Open Clarity Engine →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold text-stone-900">
            Still<span className="text-gradient">Point</span>
          </span>
          <p className="text-sm text-stone-400">
            © {new Date().getFullYear()} StillPoint. Built for founders who build what matters.
          </p>
          <div className="flex gap-6 text-sm text-stone-400">
            <Link href="/clarity-engine" className="hover:text-stone-600 transition-colors">Clarity Engine</Link>
            <Link href="/demand-founder-test" className="hover:text-stone-600 transition-colors">Demand Test</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

