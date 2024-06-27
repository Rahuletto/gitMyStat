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
          languages(first: 10) {
            totalSize
            edges{
              size
              node {
                name
                color
              }
            }
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

  const result = calculateLanguageStats(data);

  return result
}

function calculateLanguageStats(languageData: LanguageData): LanguageStat[] {
    const repositories = languageData.data.user.repositories.edges;
    const languageMap = new Map<string, { size: number; color: string }>();
    let totalSize = 0;
  
    repositories.forEach(repo => {
      const languages = repo.node.languages.edges;
      if (languages) {
        languages.forEach(lang => {
          const name = lang.node.name;
          const size = lang.size;
          const color = lang.node.color;
  
          if (languageMap.has(name)) {
            languageMap.get(name)!.size += size;
          } else {
            languageMap.set(name, { size, color });
          }
  
          totalSize += size;
        });
      }
    });
  
    const languageStats: LanguageStat[] = [];
    languageMap.forEach((value, key) => {
      const { size, color } = value;
      const percent = (size / totalSize) * 100;
      const stat: LanguageStat = {
        name: key,
        color: color,
        count: size,
        percent: parseFloat(percent.toFixed(2))
      };
      languageStats.push(stat);
    });
  
    languageStats.sort((a, b) => b.percent - a.percent);
  
    return languageStats;
  }