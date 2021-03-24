import React from 'react';
import { Profile } from '../views';

const createPropsObject = async (locale) => {
  const language = {
    locale: locale === 'es' ? 'es' : 'en',
    lang:
      locale === 'es'
        ? await (await import('../i18n/locales/editProfilePage/profile.es.json')).default
        : await (await import('../i18n/locales/editProfilePage/profile.en.json')).default,
  };
  return { language };
};

const Slug = (props) => {
  return <Profile locale={props} edit={false} />;
};

export default Slug;
