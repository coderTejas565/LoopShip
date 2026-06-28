import { api } from "~/trpc/server";

import { ProjectView } from "~/components/projects/project-view";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const caller = api();

  const [project, features] = await Promise.all([
    caller.project.getProject.query({
      projectId: id,
    }),

    caller.featureRequest.getFeatureRequests.query({
      projectId: id,
    }),
  ]);

  return <ProjectView project={project} features={features} />;
}
