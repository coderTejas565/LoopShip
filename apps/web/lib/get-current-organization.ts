import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export async function getCurrentOrganizationOrRedirect() {
  const caller = api();

  const organization =
    await caller.organization.getCurrentOrganization.query();

  if (!organization) {
    redirect("/onboarding/organization");
  }

  return organization;
}