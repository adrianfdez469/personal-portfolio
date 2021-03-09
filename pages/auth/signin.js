import React from 'react';
import { providers as providersFunc, csrfToken } from 'next-auth/client';
import { LoginView } from '../../views';
import ES from '../../i18n/locales/auth/auth.es.json';
import EN from '../../i18n/locales/auth/auth.en.json';
import { LangContext } from '../../store/contexts/langContext';

const languageLocales = {
  en: EN,
  es: ES,
};

const createPropsObject = async (locale) => {
  const lang = locale;
  const language = {
    locale: lang,
    lang: languageLocales[locale],
  };

  return { language };
};

export async function getServerSideProps(context) {
  const { locale } = context;
  const { language } = { ...(await createPropsObject(locale)) };
  const baseUrl = process.env.NEXTAUTH_URL;

  return {
    props: {
      providers: await providersFunc(context),
      language,
      csrftoken: await csrfToken(context),
      baseUrl,
    },
  };
}

// eslint-disable-next-line react/prop-types
const SignIn = ({ providers, language, csrftoken, baseUrl }) => (
  <LangContext.Provider value={language}>
    <LoginView providers={{ ...providers }} csrfToken={csrftoken} baseUrl={baseUrl} />
  </LangContext.Provider>
);

export default SignIn;
