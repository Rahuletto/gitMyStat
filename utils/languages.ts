import { LanguageData, LanguageStat } from "@/types/Languages";

export default async function LangData(user: string) {
  const graph = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
                  query {
  user(login: "${user}") {
    repositories(
      first: 100
      affiliations: [OWNER, COLLABORATOR]
      ownerAffiliations: [OWNER, COLLABORATOR]
    ) {
      edges {
        node {
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}
              `,
      variables: {},
    }),
  });

  const data: LanguageData = await graph.json();

  const repoEdges = data.data.user.repositories.edges;
  const languageCount: { [key: string]: { color: string; count: number } } = {};

  let totalRepos = 0;

  for (const edge of repoEdges) {
    const language = edge.node.primaryLanguage;
    if (language) {
      if (!languageCount[language.name]) {
        languageCount[language.name] = { color: language.color, count: 0 };
      }
      languageCount[language.name].count++;
      totalRepos++;
    }
  }

  const result: LanguageStat[] = [];
  for (const [name, { color, count }] of Object.entries(languageCount)) {
    result.push({
      name,
      color,
      count,
      percent: Number(Number((count / totalRepos) * 100).toFixed(2)),
    });
  }

  return result.sort((a, b) => b.count - a.count);
}
