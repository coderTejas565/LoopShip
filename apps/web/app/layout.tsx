import type { Metadata } from "next";
import { ThemeProvider } from "../components/providers/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "LoopShip",
  description: "Ship features from idea to production with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}