import { getSession } from 'next-auth/client';
import DateFnsAdapter from '@date-io/date-fns';
import prisma from '../../../prisma/prisma.instance';
import { generateHash, checkHash } from '../../bcrypt';

const requestGitlabEnhanceToken = async (code, originalPath) => {
  const uri = `http://localhost:3000/api/customAuth/providerCallback?param=${JSON.stringify({
    provider: 'gitlab',
    originalPath: `${originalPath}`,
  })}`;
  const response = await fetch(
    `https://gitlab.com/oauth/token?client_id=${process.env.GITLAB_ID}&client_secret=${process.env.GITLAB_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${uri}`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error('GET_TOKEN_FAIL');
  }
  const accessToken = await response.json();
  return accessToken.access_token;
};

const findEnhanceToken = async (userId) => {
  const userToken = await prisma.userTokens.findUnique({
    where: {
      userId_provider: {
        provider: 'gitlab',
        userId,
      },
    },
  });
  if (userToken) return userToken.accessToken;
  return null;
};
const getGitlabToken = async (context) => {
  const session = await getSession(context);

  if (!session) {
    throw new Error('NO_SESSION');
  }
  const accessToken = await findEnhanceToken(session.userId);
  if (!accessToken) {
    if (session.tokenProvider !== 'gitlab') {
      throw new Error('NO_PROVIDER_TOKEN');
    }
    if (!session.accessToken) {
      throw new Error('NO_ACCESS_TOKEN_ON_SESSION');
    }
    return session.accessToken;
  }
  return accessToken;
};

export const getLoginPageUrl = (querys) => {
  const scope = querys.scope ? `&scope=${querys.scope}` : '';
  const param = JSON.stringify({
    provider: 'gitlab',
    originalPath: `${process.env.NEXTAUTH_URL}${querys.originalPath}`,
  });
  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/customAuth/providerCallback?param=${param}`;
  const hash = generateHash(process.env.BCRYPT_HASH_STRING);
  return `https://gitlab.com/oauth/authorize?client_id=${process.env.GITLAB_ID}&redirect_uri=${redirectUrl}&response_type=code&state=${hash}${scope}`;
};

export const respMiddleware = async (req, res, code, state, originalPath) => {
  const checked = checkHash(process.env.BCRYPT_HASH_STRING, state);
  if (checked) {
    const session = await getSession({ req });
    const accessToken = await requestGitlabEnhanceToken(code, originalPath);
    await prisma.userTokens.upsert({
      where: {
        userId_provider: {
          provider: 'gitlab',
          userId: session.userId,
        },
      },
      create: {
        accessToken,
        provider: 'gitlab',
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

export const getUserData = async (context) => {
  const accessToken = await getGitlabToken(context);

  const response = await fetch('https://gitlab.com/api/v4/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const getExpYears = (initialDate) => {
      if (!initialDate) {
        return 0;
      }
      const dateFns = new DateFnsAdapter();
      return dateFns.getYearRange(new Date(initialDate), new Date().getTime()).length;
    };

    const data = await response.json();
    const exp = getExpYears(data.created_at);
    const twitterUrl = data.twitter ? `https://twitter.com/${data.twitterUsername}` : '';
    const linkedin = data.linkedin ? `https://www.linkedin.com/in/${data.linkedin}` : '';
    return {
      name: data.name,
      title: data.job_title,
      about: data.bio,
      experience: exp,
      birthdate: null,
      gender: null,
      email: data.public_email || data.email,
      phone: null,
      provider: 'gitlab',
      githubUrl: '',
      gitlab: data.web_url,
      linkedinUrl: linkedin,
      twitterUrl,
      avatarUrl: data.avatar_url,
    };
  }
  if (response.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  throw new Error('INTERNAL_ERROR');
};

export const getRepos = async (context) => {
  // try {
  const accessToken = await getGitlabToken(context);

  const userResponse = await fetch('https://gitlab.com/api/v4/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let userId;
  if (userResponse.ok) {
    const userData = await userResponse.json();
    userId = userData.id;
    const response = await fetch(`https://gitlab.com/api/v4/users/${userId}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return {
        repos: data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          nameWithOwner: repo.path_with_namespace,
          owner: repo.owner,
          isPrivate: repo.visibility === 'private',
          provider: 'gitlab',
        })),
        scopes: '',
      };

      /* const scopes = response.headers.get('x-oauth-scopes');
          return {
            repos: (await response.json()).data.viewer.repositories.nodes.map((repository) => ({
              ...repository,
              provider: 'github',
            })),
            scopes,
          }; */
    }
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
  }
  if (userResponse.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  throw new Error('INTERNAL_ERROR');
  /* } catch (err) {
    console.error(err);
  } */
};

export const getRepoData = async () => {};
