import React from 'react';
import Landing from '../views/landing/Landing';
import ES from '../i18n/locales/pageProfileForm/profile.es.json';
import EN from '../i18n/locales/pageProfileForm/profile.en.json';
import { LangContext } from '../store/contexts/langContext';

const languageLocales = {
  en: EN,
  es: ES,
};

const createPropsObject = async (context) => {
  const lang = context.locale;

  const language = {
    locale: lang,
    lang: languageLocales[context.locale],
  };

  return { language };
};

export const getServerSideProps = async (context) => {
  const obj = await createPropsObject(context);

  return {
    props: obj,
  };
};

export default function myComponent({ language }) {
  return (
    <LangContext.Provider value={language}>
      <Landing />
    </LangContext.Provider>
  );
}
