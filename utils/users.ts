
import { RawUserData } from "@/types/UserStats";

export default async function UserData(user: string) {
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
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
      }
      totalRepositoriesWithContributedCommits
      totalPullRequestContributions
      totalIssueContributions
    }
    repositories(first: 100) {
      nodes {
        stargazers {
          totalCount
        }
      }
    }
    followers {
      totalCount
    }
  }
}
            `,
      variables: {},
    }),
  });

  const data: RawUserData = await graph.json();
  return data;
}
