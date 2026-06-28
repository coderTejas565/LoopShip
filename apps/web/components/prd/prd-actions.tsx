"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type PRDActionsProps = {
  prdId: string;
  status: string;
};

export function PRDActions({ prdId, status }: PRDActionsProps) {
  const router = useRouter();

  const approve = trpc.prd.approvePRD.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  if (status === "approved") {
    return (
      <Badge className="gap-1 px-3 py-1">
        <CheckCircle2 className="h-4 w-4" />
        Approved
      </Badge>
    );
  }

  return (
    <Button
      onClick={() =>
        approve.mutate({
          prdId,
        })
      }
      disabled={approve.isPending}
    >
      {approve.isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Approving...
        </>
      ) : (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Approve PRD
        </>
      )}
    </Button>
  );
}
