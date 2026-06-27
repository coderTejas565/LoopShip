import Link from "next/link";

import { Button } from "../../../../components/ui/button";
import { heroContent } from "./data";
import { WorkflowAnimation } from "./animation";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <WorkflowAnimation />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start px-6 pt-32 text-center">
        <div
          className="
            rounded-full
            border
            bg-background/50
            backdrop-blur-xl
            px-4
            py-2
            text-sm
            text-muted-foreground
          "
        >
          {heroContent.badge}
        </div>

        <h1
          className="
            mt-8
            max-w-5xl
            text-5xl
            font-bold
            tracking-tight
            md:text-7xl
            lg:text-8xl
          "
        >
          {heroContent.heading.line1}
          <br />
          {heroContent.heading.line2}
        </h1>

        <p
          className="
            mt-6
            max-w-xl
            text-lg
            text-muted-foreground
            md:text-xl
          "
        >
          {heroContent.description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href={heroContent.primaryCTA.href}>{heroContent.primaryCTA.label}</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href={heroContent.secondaryCTA.href}>{heroContent.secondaryCTA.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
