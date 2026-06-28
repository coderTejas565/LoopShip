"use client";

import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";

export function PRDActions({ prdId, status }: { prdId: string; status: string }) {
  const router = useRouter();

  const approve = trpc.prd.approvePRD.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  if (status === "approved") {
    return <p>Approved ✅</p>;
  }

  return (
    <button
      onClick={() =>
        approve.mutate({
          prdId,
        })
      }
      disabled={approve.isPending}
    >
      {approve.isPending ? "Approving..." : "Approve PRD"}
    </button>
  );
}
