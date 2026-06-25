"use client";

import { trpc } from "~/trpc/client";

const FEATURE_REQUEST_ID =
  "a5edc176-35bf-4192-bd36-6d87d690f8e6";


export default function DevPage() {

  const featureRequest =
    trpc.featureRequest.getFeatureRequest.useQuery({
      featureRequestId: FEATURE_REQUEST_ID,
    });


  return (
    <div className="p-10 space-y-5">

      <h1 className="text-2xl font-bold">
        Get Feature Request Test
      </h1>


      <pre>
        {JSON.stringify(
          featureRequest.data,
          null,
          2
        )}
      </pre>

    </div>
  );
}