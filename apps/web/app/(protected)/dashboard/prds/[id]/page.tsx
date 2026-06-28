import { api } from "~/trpc/server";
import { PRDView } from "~/components/prd/prd-view";

export default async function PRDPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id: prdId } = await params;

  const caller = api();

  const prd = await caller.prd.getPRD.query({
    prdId,
  });

  return <PRDView prd={prd} />;
}
