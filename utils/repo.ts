import { RawRepoData } from "@/types/Repo";

export default async function RepoData(user: string, repo: string) {
  const graph = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private; stale-while-revalidate=3600",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
      query {
  user(login: "${user}") {
    repository(name: "${repo}"){
      name
      description
      stargazerCount
      forkCount
      primaryLanguage {
        name
        color
      }
    }
  }
}
            `,
      variables: {},
    }),
  });

  const data: RawRepoData = await graph.json();
  return data;
}
