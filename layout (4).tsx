import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clarity Engine",
  description:
    "Describe your challenge and receive a root-cause analysis, strategic path, and immediate action plan — powered by StillPoint's AI diagnostic engine.",
};

export default function ClarityEngineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

