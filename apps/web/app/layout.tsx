import type { Metadata } from "next";

import "./globals.css";

import { GlobalProviders } from "~/providers/global";

export const metadata: Metadata = {
  title: "LoopShip",
  description: "Ship features from idea to production with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
