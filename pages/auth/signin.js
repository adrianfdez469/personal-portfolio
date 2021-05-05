import React from 'react';
import { providers as providersFunc, csrfToken } from 'next-auth/client';
import { LoginView } from '../../views';
import { getLanguageByLocale } from '../../backend/preRenderingData';
import ES from '../../i18n/locales/auth/auth.es.json';
import EN from '../../i18n/locales/auth/auth.en.json';
import { LangContext } from '../../store/contexts/langContext';

const languageLocales = {
  en: EN,
  es: ES,
};

export async function getServerSideProps(context) {
  const language = await getLanguageByLocale(context.locale, languageLocales);
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
