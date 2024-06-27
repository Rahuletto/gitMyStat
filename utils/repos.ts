export default async function RepoData(user: string) {
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
        repositories(first: 1, orderBy: {direction: DESC, field: UPDATED_AT}) {
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
