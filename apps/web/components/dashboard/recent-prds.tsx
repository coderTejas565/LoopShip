import Link from "next/link";

import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

type RecentPRDsProps = {
  prds: {
    id: string;
    version: number;
    status: string;

    featureRequest: {
      title: string;
    };
  }[];
};

function getStatusVariant(status: string) {
  switch (status) {
    case "approved":
      return "default";

    case "generated":
      return "secondary";

    case "archived":
      return "outline";

    default:
      return "outline";
  }
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function RecentPRDs({ prds }: RecentPRDsProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle>Recent PRDs</CardTitle>

          <CardDescription>Review and approve AI-generated product documents.</CardDescription>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/prds">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {prds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">No PRDs yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">Generated PRDs will appear here.</p>
          </div>
        ) : (
          <div className="divide-y">
            {prds.map((prd) => (
              <Link
                key={prd.id}
                href={`/dashboard/prds/${prd.id}`}
                className="
                group
                flex
                items-center
                justify-between
                px-6
                py-5
                transition
                hover:bg-muted/50
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-md
                    bg-primary/10
                    "
                  >
                    <FileText className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3
                      className="
                    font-medium
                    group-hover:text-primary
                    "
                    >
                      {prd.featureRequest.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">PRD Version {prd.version}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={getStatusVariant(prd.status)}>{formatStatus(prd.status)}</Badge>

                  <ArrowRight
                    className="
                    h-4 w-4
                    text-muted-foreground
                    transition
                    group-hover:translate-x-1
                    "
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
