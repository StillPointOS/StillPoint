import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StillPoint — Clarity for Founders Who Build What Matters",
    template: "%s | StillPoint",
  },
  description:
    "StillPoint equips demand-driven founders with the Clarity Engine and Demand Founder Test — AI-powered tools to cut through noise, validate ideas, and move with conviction.",
  keywords: [
    "founder tools",
    "demand validation",
    "startup clarity",
    "AI founder coach",
    "idea validation",
    "StillPoint Clarity Engine",
  ],
  openGraph: {
    title: "StillPoint — Clarity for Founders Who Build What Matters",
    description:
      "AI-powered clarity and demand validation tools for founders ready to build with confidence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "StillPoint",
    description: "Clarity for founders who build what matters.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="animated-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}

