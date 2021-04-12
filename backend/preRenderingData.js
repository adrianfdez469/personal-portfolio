import { getSession } from 'next-auth/client';
// import prisma from '../prisma/prisma.instance';

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
  }`
    : ''
}
`;
const queryUserDataById = (id, includeProjects = false) => {
  return `
    {
      user(id: ${id}) {
        ${queryUserBody(includeProjects)}
      }
    }
  `;
};
const queryUserDataBySlug = (slug, includeProjects = false) => `
  {
    userBySlug(slug: "${slug}") {
      ${queryUserBody(includeProjects)}
    }
  }
`;

const getProfileDataByKey = async (query) => {
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

export const getThemeByThemeKey = async (themeKey) => {
  const themesLoader = await import('../themes').then((cmp) => cmp.themesLoader);
  const theme = await themesLoader[themeKey].getTheme();
  return theme;
};

export const getThemeByUserId = async (userId) => {
  const { user } = await getProfileDataByKey(queryUserDataById(userId, false));
  if (user && user.theme) {
    return getThemeByThemeKey(user.theme);
  }
  return null;
};

export const getThemeByContext = async (context) => {
  const session = await getSession(context);
  if (session && session.userId) {
    return getThemeByUserId(+session.userId);
  }
  return null;
};

export const getProfileDataById = async (id, includeProjects = false) => {
  const profileData = await getProfileDataByKey(queryUserDataById(id, includeProjects));
  return profileData.data;
};
export const getProfileDataBySlug = async (slug, includeProjects = false) => {
  const profileData = await getProfileDataByKey(queryUserDataBySlug(slug, includeProjects));
  if (!profileData || !profileData.data || !profileData.data.userBySlug) {
    return null;
  }
  return {
    user: { ...profileData.data.userBySlug },
  };
};

export const getProjectDataByProjectSlug = (projectSlug) => {};
