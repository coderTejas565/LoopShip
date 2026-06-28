import { api } from "~/trpc/server";
import { PRDView } from "~/components/prd/prd-view";


export default async function PRDPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = await params;

  const caller = api();

  const prd =
    await caller.prd.getPRD.query({
      prdId: id,
    });


  return (
    <PRDView prd={prd}/>
  );
}