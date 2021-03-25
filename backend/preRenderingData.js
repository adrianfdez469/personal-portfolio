import { getSession } from 'next-auth/client';
import prisma from '../prisma/prisma.instance';

export const preRenderLanguage = async (context, languageLocales) => {
  const lang = context.locale;

  const language = {
    locale: lang,
    lang: languageLocales[context.locale],
  };

  return language;
};

const loadUser = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const preRenderUserTheme = async (context) => {
  const session = await getSession(context);
  const themesLoader = await import('../themes').then((cmp) => cmp.themesLoader);
  if (session && session.userId) {
    const user = await loadUser(+session.userId);
    if (user.theme) {
      const theme = await themesLoader[user.theme].getTheme();
      console.log('Le mando el tema ', user.theme);
      return theme;
    }
  }
  return null;
};

export const staticRenderUserTheme = async (userId) => {
  const themesLoader = await import('../themes').then((cmp) => cmp.themesLoader);
  const user = await loadUser(+userId);
  if (user.theme) {
    const theme = await themesLoader[user.theme].getTheme();
    return theme;
  }
  return null;
};
