import { createGitHubClient } from "./client";

export async function getRepositories(accessToken: string) {
  const github = createGitHubClient(accessToken);

  const { data } = await github.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 100,
  });

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    defaultBranch: repo.default_branch,
    private: repo.private,
    description: repo.description,
    htmlUrl: repo.html_url,
  }));
}
