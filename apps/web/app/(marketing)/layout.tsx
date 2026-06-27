import type { ReactNode } from "react";

import { Navbar } from "./sections/Navbar";
// import { Footer } from "./sections/footer";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>{children}</main>

      {/* Uncomment when you build it */}
      {/* <Footer /> */}
    </div>
  );
}
