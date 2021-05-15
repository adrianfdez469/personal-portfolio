import React from 'react';
import { LoginView } from '../../views';
import { getLanguageByLocale } from '../../backend/preRenderingData';
import ES from '../../i18n/locales/auth/auth.es.json';
import EN from '../../i18n/locales/auth/auth.en.json';
import { LangContext } from '../../store/contexts/langContext';

const languageLocales = {
  en: EN,
  es: ES,
};

export async function getStaticProps(context) {
  const language = await getLanguageByLocale(context.locale, languageLocales);
  const baseUrl = process.env.NEXTAUTH_URL;
  return {
    props: {
      language,
      baseUrl,
    },
  };
}

// eslint-disable-next-line react/prop-types
const SignIn = ({ language, baseUrl }) => (
  <LangContext.Provider value={language}>
    <LoginView baseUrl={baseUrl} />
  </LangContext.Provider>
);

export default SignIn;
