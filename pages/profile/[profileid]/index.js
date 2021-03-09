import React from 'react';
import { Profile } from '../../../views';

// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../i18n/locales/profile/project.es.json';
import EN from '../../../i18n/locales/profile/project.en.json';

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
/*
export const getStaticProps = async (context) => {
  const { locale } = context;
  const obj = await createPropsObject(locale);

  return {
    props: obj,
  };
}; */

export const getServerSideProps = async (context) => {
  const { locale } = context;
  const obj = await createPropsObject(locale);

  return {
    props: obj,
  };
};

const Edit = (props) => <Profile locale={props} edit />;

export default Edit;
