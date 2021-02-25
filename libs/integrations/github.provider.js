import { getSession } from 'next-auth/client';

const getReposQuery = (first = 50) => `
  query { 
    viewer { 
      repositories(first:${Math.max(first, 50)}){
        nodes{
          id
          name
          description
          nameWithOwner
          owner {
            id
            login
            avatarUrl
          }
        }
      }
    }
  }`;

export const getGithubRepos = async (context) => {
  const session = await getSession(context);
  if (session && session.accessToken) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        query: getReposQuery(),
      }),
    });
    if (response.ok) {
      return (await response.json()).data.viewer.repositories.nodes.map((repository) => ({
        ...repository,
        provider: 'github',
      }));
    }
  }
  throw new Error('CANT_LOAD_PROVIDER_DATA');
};

const getRepoData = (projectId) => `
query { 
  node(id:"${projectId}"){
    __typename
    ... on Repository {
      id
      name
      description
      createdAt
      url
      deployments(last:1) {
        nodes {
          latestStatus {
            environmentUrl
          }
        }
      }
      languages(first: 50){
        nodes{
          name
        }
      }
      mentionableUsers (first: 6) {
        nodes {
          login
          avatarUrl
          email
          bio
          name
          url
        }
        totalCount
      }
      owner {
        id
        login
      }
    }
  }
}`;

export const getGithubRepoData = async (context, projectId) => {
  const session = await getSession(context);

  if (session && session.accessToken) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        query: getRepoData(projectId),
      }),
    });
    if (response.ok) {
      const { data } = await response.json();
      return {
        ...data.node,
        provider: 'github',
      };
    }
  }
  throw new Error('CANT_LOAD_PROVIDER_DATA');
};
