/* eslint-disable react/prop-types */
import React from 'react';
import Error from 'next/error';
import {
  getProfileDataBySlug,
  getLanguageByLocale,
  getThemeByThemeKey,
  // eslint-disable-next-line import/named
} from '../backend/preRenderingData';
import { Profile } from '../views';
import ProfileProvider from '../store/contexts/profileContext';
import { LangContext } from '../store/contexts/langContext';
import ES from '../i18n/locales/editProfilePage/profile.es.json';
import EN from '../i18n/locales/editProfilePage/profile.en.json';
import { revalidationErrorTime, revalidationTime } from '../constants/pageRevalidationTime';

const languageLocales = {
  en: EN,
  es: ES,
};

// This function gets called at build time
export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export const getStaticProps = async (context) => {
  try {
    const profileData = await getProfileDataBySlug(context.params.slug, true);

    if (!profileData) {
      return {
        props: {
          error: 404,
        },
        revalidate: revalidationErrorTime,
      };
    }
    const language = await getLanguageByLocale(context.locale, languageLocales);
    const theme = await getThemeByThemeKey(profileData.user.theme);
    const props = { language, theme, profile: profileData };

    return {
      props,
      revalidate: revalidationTime,
    };
  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      error: 500,
    },
    revalidate: revalidationErrorTime,
  };
};

const Slug = (props) => {
  const { language, profile, error } = props;
  if (!language && !profile && !error) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <LangContext.Provider value={language}>
      <ProfileProvider value={profile}>
        <Profile />
      </ProfileProvider>
    </LangContext.Provider>
  );
};

export default Slug;
