export const getUserDataByContext = async () => {};

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
  /* 
    name: data.name,
    title: '',
    about: data.bio,
    experience: exp,
    birthday: null,
    gender: null,
    email: data.email,
    phone: null,
    provider: 'github',
    githubUrl: data.url,
    gitlabUrl: '',
    linkedinUrl: '',
    twitterUrl,
    avatarUrl: data.avatarUrl,
  */
};
