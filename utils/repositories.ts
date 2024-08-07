export default async function RepoList(user: string) {
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
        repositories(first: 1, orderBy: {direction: DESC, field: PUSHED_AT}) {
          edges {
            node {
              id
              url
              name
              description
              primaryLanguage {
                name
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

  const data = await graph.json();
  return data;
}
