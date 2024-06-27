
import { RawLanguageData } from "@/types/Languages";

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
    ) {
      edges {
        node {
          languages(first: 10) {
            totalSize
            edges {
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

  const data: RawLanguageData = await graph.json();

  return data
}