"use client";

import { trpc } from "~/trpc/client";

export default function TestPage() {
  const { data, error, isLoading } =
    trpc.organization.me.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}