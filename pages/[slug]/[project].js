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
import { ProjectContext } from '../../store/contexts/projectContext';
import ES from '../../i18n/locales/projectPage/project.es.json';
import EN from '../../i18n/locales/projectPage/project.en.json';
import { revalidationErrorTime, revalidationTime } from '../../constants/pageRevalidationTime';
import Project from '../../views/project/Project';

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
  const { language, project, error } = props;
  if (!language && !project && !error) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <LangContext.Provider value={language}>
      <ProjectContext.Provider value={project}>
        <Project />
      </ProjectContext.Provider>
    </LangContext.Provider>
  );
};

export default ProjectSlug;
