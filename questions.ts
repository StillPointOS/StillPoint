import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="font-display text-8xl font-bold text-gradient mb-4">404</div>
      <h1 className="font-display text-3xl font-bold text-stone-900 mb-3">Page not found</h1>
      <p className="text-stone-500 mb-8 max-w-md">
        This page doesn't exist — but your still point does. Head back and find it.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/clarity-engine"
          className="px-6 py-3 bg-white text-stone-700 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-all border border-stone-200"
        >
          Clarity Engine
        </Link>
      </div>
    </div>
  );
}

