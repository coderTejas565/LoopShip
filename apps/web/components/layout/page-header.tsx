"use client";

import Link from "next/link";

import { ChevronRight, ArrowLeft } from "lucide-react";

import { Button } from "~/components/ui/button";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;

  backHref?: string;
  backLabel?: string;

  breadcrumbs?: Breadcrumb[];

  actions?: React.ReactNode;
};

export function PageHeader({
  title,
  description,

  backHref,
  backLabel,

  breadcrumbs = [],

  actions,
}: PageHeaderProps) {
  return (
    <header className="space-y-6">
      {backHref && (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit px-0 text-muted-foreground hover:text-foreground"
        >
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4" />

            {backLabel ?? "Back"}
          </Link>
        </Button>
      )}

      {breadcrumbs.length > 0 && (
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.label}</span>
              )}

              {index !== breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
            </div>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-6 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

          {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
        </div>

        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}
