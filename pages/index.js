import React from 'react';
import Landing from '../views/landing/Landing';
import ES from '../i18n/locales/pageProfileForm/profile.es.json';
import EN from '../i18n/locales/pageProfileForm/profile.en.json';
import { LangContext } from '../store/contexts/langContext';
import { preRenderLanguage, preRenderUserTheme } from '../backend/preRenderingData';

const languageLocales = {
  en: EN,
  es: ES,
};

export const getServerSideProps = async (context) => {
  const language = await preRenderLanguage(context, languageLocales);
  const theme = await preRenderUserTheme(context);

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
