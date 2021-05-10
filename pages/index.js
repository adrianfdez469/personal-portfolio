import React from 'react';
import Landing from '../views/landing/Landing';

import ES from '../i18n/locales/landing/landign.es.json';
import EN from '../i18n/locales/landing/landing.en.json';

import { LangContext } from '../store/contexts/langContext';
import { getLanguageByLocale } from '../backend/preRenderingData';

const languageLocales = {
  en: EN,
  es: ES,
};

export async function getStaticPaths(context) {
  return {
    paths: context.locales.map((locale) => ({ locale })),
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const language = await getLanguageByLocale(context.locale, languageLocales);
  const props = { language };
  return {
    props,
  };
};

export default function myComponent({ language }) {
  return (
    <LangContext.Provider value={language}>
      <Landing />
    </LangContext.Provider>
  );
}
