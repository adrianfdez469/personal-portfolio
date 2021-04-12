/* eslint-disable react/prop-types */
import React from 'react';
import Error from 'next/error';
import {
  getProjectDataByProjectSlug,
  getLanguageByLocale,
  getThemeByContext,
  // eslint-disable-next-line import/named
} from '../../backend/preRenderingData';
import { LangContext } from '../../store/contexts/langContext';
import ES from '../../i18n/locales/editProfilePage/profile.es.json';
import EN from '../../i18n/locales/editProfilePage/profile.en.json';
import { revalidationErrorTime, revalidationTime } from '../../constants/pageRevalidationTime';

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
    const projectData = await getProjectDataByProjectSlug(context.params.project);

    if (!projectData) {
      return {
        props: {
          error: 404,
        },
        revalidate: revalidationErrorTime,
      };
    }
    const language = await getLanguageByLocale(context.locale, languageLocales);
    const theme = await getThemeByContext(context);
    const props = { language, theme, project: projectData };

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

const ProjectSlug = (props) => {
  const { language, profile, error } = props;
  if (!language && !profile && !error) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <LangContext.Provider value={language}>
      {/* <ProfileProvider value={profile}> */}
      {/* <Profile edit={false} /> */}
      {/* </ProfileProvider> */}
    </LangContext.Provider>
  );
};

export default ProjectSlug;
