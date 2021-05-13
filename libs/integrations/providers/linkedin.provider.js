import { getSession } from 'next-auth/client';
import { generateHash, checkHash } from '../../bcrypt';
import { findEnhanceToken, deleteUserToken } from './provider.common';

const provider = 'linkedin';

const fetchUserBasicData = async (accessToken) => {
  const response = await fetch(
    `https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    throw new Error('INTERNAL_ERROR');
  }
  const resp = await response.json();
  let userBasicInfo = {};
  userBasicInfo = {
    id: resp.id,
    name: `${resp.localizedFirstName}${resp.localizedLastName ? ' ' + resp.localizedLastName : ''}`,
  };
  let image;
  if (resp.profilePicture['displayImage~']?.elements?.length > 0) {
    const arrEls = resp.profilePicture['displayImage~'].elements.filter(
      (el) =>
        el.data['com.linkedin.digitalmedia.mediaartifact.StillImage'].storageSize.width === 200
    );
    if (
      arrEls?.length > 0 &&
      arrEls[0].identifiers?.length > 0 &&
      arrEls[0].identifiers[0].identifier
    ) {
      image = arrEls[0].identifiers[0].identifier;
    } else if (
      resp.profilePicture['displayImage~'].elements?.length > 0 &&
      resp.profilePicture['displayImage~'].elements[0].identifiers?.length > 0 &&
      resp.profilePicture['displayImage~'].elements[0].identifiers[0].identifier
    ) {
      image = resp.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
    }
  }

  return {
    ...userBasicInfo,
    ...(image && { image }),
  };
};

const fetchUserEmail = async (accessToken) => {
  const response = await fetch(
    `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    throw new Error('INTERNAL_ERROR');
  }
  const resp = await response.json();
  if (resp?.elements?.length > 0) {
    return resp.elements[0]['handle~'].emailAddress;
  }
  return null;
};

export const getUserLoginDataByToken = async (accessToken) => {
  const basicUserData = await fetchUserBasicData(accessToken);
  const userEmail = await fetchUserEmail(accessToken);
  return {
    ...basicUserData,
    ...(userEmail && { email: userEmail }),
  };
};

export const getUserDataByToken = async (accessToken) => {
  const data = await getUserLoginDataByToken(accessToken);
  return {
    name: data.name,
    // title: '',
    // about: '',
    // experience: null,
    // birthday: null,
    // gender: null,
    email: data.email,
    // phone: null,
    provider: provider,
    // githubUrl: '',
    // gitlabUrl: '',
    // linkedinUrl: '',
    // twitterUrl,
    avatarUrl: data.image,
  };
};

const getLinkInToken = async (context) => {
  const session = await getSession(context);

  if (!session) {
    throw new Error('NO_SESSION');
  }
  const accessToken = await findEnhanceToken(session.userId, context.prisma, provider);
  console.log(accessToken);
  if (!accessToken) {
    if (session.tokenProvider !== provider) {
      throw new Error('NO_PROVIDER_TOKEN');
    }
    if (!session.accessToken) {
      throw new Error('NO_ACCESS_TOKEN_ON_SESSION');
    }
    return session.accessToken;
  }
  return accessToken;
};

export const getUserDataByContext = async (context) => {
  try {
    const accessToken = await getLinkInToken(context);
    const userData = await getUserDataByToken(accessToken);
    return userData;
  } catch (err) {
    if (err.message === 'UNAUTHORIZED') {
      await deleteUserToken(context, provider);
      return getUserDataByContext(context);
    }
    throw err;
  }
};

export const getLoginPageUrl = (querys) => {
  const scope = querys.scope ? `&scope=${querys.scope}` : '';
  const param = JSON.stringify({
    provider,
    originalPath: `${process.env.NEXTAUTH_URL}${querys.originalPath}`,
  });
  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/customAuth/providerCallback?param=${param}`;
  const hash = generateHash(process.env.BCRYPT_HASH_STRING);
  // example: GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri={your_callback_url}&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${hash}${scope}`;
};

const requestLinkinEnhanceToken = async (code, originalPath) => {
  const uri = `${process.env.NEXTAUTH_URL}/api/customAuth/providerCallback?param=${JSON.stringify({
    provider,
    originalPath: `${originalPath}`,
  })}`;
  // example:  https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={authorization_code_from_step2_response}&redirect_uri={your_callback_url}&client_id={your_client_id}&client_secret={your_client_secret}'
  const response = await fetch(
    `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=${uri}`,
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

export const respMiddleware = async (req, res, code, state, originalPath, prisma) => {
  const checked = checkHash(process.env.BCRYPT_HASH_STRING, state);
  if (checked) {
    const session = await getSession({ req });

    const accessToken = await requestLinkinEnhanceToken(code, originalPath);

    await prisma.userTokens.upsert({
      where: {
        userId_provider: {
          provider,
          userId: session.userId,
        },
      },
      create: {
        accessToken,
        provider,
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
