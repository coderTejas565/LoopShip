import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth";

import { api } from "~/trpc/server";

import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { RecentProjects } from "~/components/dashboard/recent-projects";
import { RecentFeatureRequests } from "~/components/dashboard/recent-feature-requests";
import { RecentPRDs } from "~/components/dashboard/recent-prds";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }


  const caller = api();


  const organization =
    await caller.organization.getCurrentOrganization.query();


  const [
    projects,
    recentFeatures,
    recentPRDs,
  ] = await Promise.all([

    caller.project.getProjects.query({
      organizationId: organization.id,
    }),


    caller.featureRequest.getRecentFeatureRequests.query({
      organizationId: organization.id,
      limit: 5,
    }),


    caller.prd.getRecentPRDs.query({
      organizationId: organization.id,
      limit: 5,
    }),

  ]);


  return (
    <div className="space-y-10">

      <DashboardHeader
        name={session.user.name}
      />


      <RecentProjects
        projects={projects.slice(0, 5)}
      />


      <RecentFeatureRequests
        features={recentFeatures}
      />


      <RecentPRDs
        prds={recentPRDs}
      />

    </div>
  );
}