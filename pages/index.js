import React from 'react';
import Landing from '../views/landing/Landing';

import ES from '../i18n/locales/landing/landign.es.json';
import EN from '../i18n/locales/landing/landing.en.json';

import { LangContext } from '../store/contexts/langContext';
import { getLanguageByLocale, getThemeByContext } from '../backend/preRenderingData';

const languageLocales = {
  en: EN,
  es: ES,
};

export const getServerSideProps = async (context) => {
  const language = await getLanguageByLocale(context.locale, languageLocales);
  const theme = await getThemeByContext(context);

  return {
    props: {
      language,
      theme,
    },
  };
};

export default function myComponent({ language }) {
  return (
    <LangContext.Provider value={language}>
      <Landing />
    </LangContext.Provider>
  );
}
