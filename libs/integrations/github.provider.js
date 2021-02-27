import { getSession } from 'next-auth/client';
import prisma from '../../prisma/prisma.instance';

const gqlRepos = (first = 50) => `
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
          isPrivate
        }
      }
    }
  }`;

const gqlRepoData = (projectId) => `
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

const getGithubEnhanceToken = async (userId) => {
  const userToken = await prisma.userTokens.findUnique({
    where: {
      userId_provider: {
        provider: 'github',
        userId,
      },
    },
  });
  if (userToken) return userToken.accessToken;
  return null;
};

const getGithubToken = async (context) => {
  const session = await getSession(context);

  if (!session) {
    throw new Error('NO_SESSION');
  }
  const accessToken = await getGithubEnhanceToken(session.userId);
  if (!accessToken) {
    if (session.tokenProvider !== 'github') {
      throw new Error('NO_GITHUB_TOKEN');
    }
    if (!session.accessToken) {
      throw new Error('NO_ACCESS_TOKEN_ON_SESSION');
    }
    return session.accessToken;
  }
  return accessToken;
};

const getGithubEnhaceToken = async (code, state) => {
  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=${state}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('GET_TOKEN_FAIL');
  }
  const accessToken = await response.json();
  return accessToken.access_token;
};

export const getGithubRepos = async (context) => {
  const accessToken = await getGithubToken(context);
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: gqlRepos(),
    }),
  });
  if (response.ok) {
    return (await response.json()).data.viewer.repositories.nodes.map((repository) => ({
      ...repository,
      provider: 'github',
    }));
  }
  if (response.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  throw new Error('INTERNAL_ERROR');
};

export const getGithubRepoData = async (context, projectId) => {
  const accessToken = await getGithubToken(context);

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: gqlRepoData(projectId),
    }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return {
      ...data.node,
      provider: 'github',
    };
  }
  throw new Error('CANT_LOAD_PROVIDER_DATA');
};

export const saveGithubEnhanceToken = async (userId, code, state) => {
  const accessToken = await getGithubEnhaceToken(code, state);

  await prisma.userTokens.upsert({
    where: {
      userId_provider: {
        provider: state,
        userId,
      },
    },
    create: {
      accessToken,
      provider: state,
      userId,
    },
    update: {
      accessToken,
    },
  });
};

export const deleteGithubEnhanceToken = async (userId) => {
  prisma.userTokens.delete({
    where: {
      userId_provider: {
        provider: 'github',
        userId,
      },
    },
  });
};
