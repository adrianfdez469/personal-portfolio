import { getSession } from 'next-auth/client';
import DateFnsAdapter from '@date-io/date-fns';
import prisma from '../../../prisma/prisma.instance';
import { generateHash, checkHash } from '../../bcrypt';

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

const gqlUserData = () => `
  query { 
    viewer { 
      login
      name
      bio
      email
      avatarUrl
      url
      twitterUsername
      company
      location
      websiteUrl
      createdAt
    }
  }
`;

const findEnhanceToken = async (userId) => {
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
  const accessToken = await findEnhanceToken(session.userId);
  if (!accessToken) {
    if (session.tokenProvider !== 'github') {
      throw new Error('NO_PROVIDER_TOKEN');
    }
    if (!session.accessToken) {
      throw new Error('NO_ACCESS_TOKEN_ON_SESSION');
    }
    return session.accessToken;
  }
  return accessToken;
};

const requestGithubEnhanceToken = async (code, state) => {
  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&state=${state}`,
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

export const getLoginPageUrl = (querys) => {
  const scope = querys.scope ? `&scope=${querys.scope}` : '';
  const param = JSON.stringify({
    provider: 'github',
    originalPath: `${process.env.NEXTAUTH_URL}${querys.originalPath}`,
  });
  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/customAuth/providerCallback?param=${param}`;
  const hash = generateHash(process.env.BCRYPT_HASH_STRING);

  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${redirectUrl}${scope}&state=${hash}`;
};

export const respMiddleware = async (req, res, code, state, originalPath) => {
  const checked = checkHash(process.env.BCRYPT_HASH_STRING, state);
  if (checked) {
    const session = await getSession({ req });
    const accessToken = await requestGithubEnhanceToken(code, state);
    await prisma.userTokens.upsert({
      where: {
        userId_provider: {
          provider: 'github',
          userId: session.userId,
        },
      },
      create: {
        accessToken,
        provider: 'github',
        userId: session.userId,
      },
      update: {
        accessToken,
      },
    });
    res.writeHead(301, {
      Location: `${originalPath}`,
    });
    res.end();
  }
};

export const deleteEnhanceToken = async (userId) => {
  prisma.userTokens.delete({
    where: {
      userId_provider: {
        provider: 'github',
        userId,
      },
    },
  });
};

export const getUserData = async (context) => {
  const accessToken = await getGithubToken(context);
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: gqlUserData(),
    }),
  });
  if (response.ok) {
    const getExpYears = (initialDate) => {
      if (!initialDate) {
        return 0;
      }

      const dateFns = new DateFnsAdapter();
      return dateFns.getYearRange(new Date(initialDate), new Date().getTime()).length;
    };

    const resp = await response.json();
    const data = resp.data.viewer;
    const exp = getExpYears(data.createdAt);
    const twitterUrl = data.twitterUsername ? `https://twitter.com/${data.twitterUsername}` : '';
    return {
      name: data.name,
      title: '',
      about: data.bio,
      experience: exp,
      birthdate: null,
      gender: null,
      email: data.email,
      phone: null,
      provider: 'github',
      githubUrl: data.url,
      gitlab: '',
      linkedinUrl: '',
      twitterUrl,
      avatarUrl: data.avatarUrl,
    };
  }
  if (response.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  throw new Error('INTERNAL_ERROR');
};

export const getRepos = async (context) => {
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
    const scopes = response.headers.get('x-oauth-scopes');
    return {
      repos: (await response.json()).data.viewer.repositories.nodes.map((repository) => ({
        ...repository,
        provider: 'github',
      })),
      scopes,
    };
  }
  if (response.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  throw new Error('INTERNAL_ERROR');
};

export const getRepoData = async (context, projectId) => {
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
