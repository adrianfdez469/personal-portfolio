export const getLanguageByLocale = async (locale, languageLocales) => {
  const lang = locale;

  const language = {
    locale: lang,
    lang: languageLocales[locale],
  };

  return language;
};

const queryUserBody = (includeProjects) => `
id
name
image
title
description
slug
publicProfile
theme
email
phone
gitlabLink
githubLink
linkedinLink
twitterLink
experience
birthday
gender
${
  includeProjects
    ? `projects {
    id
    name
    description
    initialDate
    finalDate
    skills {
      id
      name
      category
    }
    projectLink
    projectDevLink
    otherInfo
    images {
      id
      imageUrl
    }
    logoUrl
    projectSlug
  }`
    : ''
}
`;
const queryUserDataById = (id, includeProjects = false) => `
    {
      user(id: ${id}) {
        ${queryUserBody(includeProjects)}
      }
    }
  `;
const queryUserDataBySlug = (slug, includeProjects = false) => `
  {
    userBySlug(slug: "${slug}") {
      ${queryUserBody(includeProjects)}
    }
  }
`;

const makeRequest = async (query) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error('Error');
  }

  const resp = await response.json();
  return resp;
};

export const getThemeByUserId = async (userId) => {
  const { data } = await makeRequest(queryUserDataById(userId, false));
  if (data.user && data.user.theme) {
    return data.user.theme;
  }
  return null;
};

export const getProfileDataById = async (id, includeProjects = false) => {
  const profileData = await makeRequest(queryUserDataById(id, includeProjects));
  return profileData.data;
};
export const getProfileDataBySlug = async (slug, includeProjects = false) => {
  const profileData = await makeRequest(queryUserDataBySlug(slug, includeProjects));
  if (!profileData || !profileData.data || !profileData.data.userBySlug) {
    return null;
  }
  return {
    user: { ...profileData.data.userBySlug },
  };
};

export const getThemeByUserSlug = async (userSlug) => {
  const { user } = await getProfileDataBySlug(userSlug, false);
  if (user && user.theme) return user.theme;
  return null;
};

export const getProjectDataByProjectSlug = async (projectSlug) => {
  const query = `
    query getData ($projectSlug: String!){
      projectBySlug(projectSlug: $projectSlug){
        id
        name
        description
        initialDate
        finalDate
        skills {
          id
          name
          category
        }
        projectLink
        projectDevLink
        otherInfo
        images {
          id
          imageUrl
        }
        logoUrl
        collaborators {
          login
          avatarUrl
          email
          bio
          name
          url
          isOwner
        }
        slug
        projectSlug
      }
    }
  `;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        projectSlug,
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Error');
  }
  const resp = await response.json();
  return resp.data.projectBySlug;
};

export const getProjectDataByProjectId = async (projectId) => {
  const query = `
    query getData ($id: IntComparer){
      projects(id: $id){
        id
        name
        description
        initialDate
        finalDate
        skills {
          id
          name
          category
        }
        projectLink
        projectDevLink
        otherInfo
        images {
          id
          imageUrl
        }
        logoUrl
        collaborators {
          login
          avatarUrl
          email
          bio
          name
          url
          isOwner
        }
        slug
        projectSlug
      }
    }
  `;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        id: {
          equals: projectId,
        },
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Error');
  }
  const resp = await response.json();
  if (resp.data.projects.length !== 1) {
    throw new Error('Error');
  }
  return resp.data.projects[0];
};

export const getProfileSkills = async (profileId) => {
  const query = `
    query getUserSkills($id: ID!) {
      user(id: $id){
        projects {
          skills{
            id
            name
            category
          }
        }
      }
    }
  `;
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        id: profileId,
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Error');
  }
  const resp = await response.json();
  const skills = resp.data.user.projects.reduce((acum, project) => {
    project.skills.forEach((sk) => {
      if (acum[sk.name]) {
        acum[sk.name].cant = acum[sk.name].cant + 1;
      } else {
        acum = {
          ...acum,
          [sk.name]: {
            cant: 1,
            category: sk.category,
          },
        };
      }
    });
    return acum;
  }, {});

  return Object.keys(skills)
    .map((skill) => ({
      skill,
      ...skills[skill],
    }))
    .sort((a, b) => b.cant - a.cant);
};
