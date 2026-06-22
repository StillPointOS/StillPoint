import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demand Founder Test",
  description:
    "Score your demand signals across 12 weighted questions. Find out whether you have a problem worth building before you spend a year building it.",
};

export default function DemandTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

