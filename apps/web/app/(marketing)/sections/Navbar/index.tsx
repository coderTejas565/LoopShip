"use client";

import Link from "next/link";

import { Button } from "../../../../components/ui/button";

import { navLinks } from "./data";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-border
        bg-background/70
        backdrop-blur-2xl
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}

        <Link href="/" className="text-lg font-semibold tracking-tight">
          LoopShip
        </Link>

        {/* Desktop Nav */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
