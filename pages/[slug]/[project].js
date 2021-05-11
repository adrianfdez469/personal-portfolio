/* eslint-disable react/prop-types */
import React from 'react';
import Error from 'next/error';
import {
  getLanguageByLocale,
  // eslint-disable-next-line import/named
} from '../../backend/preRenderingData';
import { LangContext } from '../../store/contexts/langContext';
import { ProjectContext } from '../../store/contexts/projectContext';
import ES from '../../i18n/locales/projectPage/project.es.json';
import EN from '../../i18n/locales/projectPage/project.en.json';
import { revalidationErrorTime, revalidationTime } from '../../constants/pageRevalidationTime';
import Project from '../../views/project/Project';
import prisma from '../../prisma/prisma.instance';

const languageLocales = {
  en: EN,
  es: ES,
};

// This function gets called at build time
export async function getStaticPaths() {
  const publicProfiles = await prisma.user.findMany({
    where: {
      publicProfile: true,
    },
    select: {
      slug: true,
      Project: {
        select: {
          projectSlug: true,
        },
        where: {
          publicProject: true,
        },
      },
    },
  });

  const paths = publicProfiles.reduce((acum, user) => {
    const projects = user.Project.map((project) => ({
      params: {
        slug: user.slug,
        project: project.projectSlug,
      },
    }));
    return [...acum, ...projects];
  }, []);
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  try {
    const projectData = await prisma.project.findFirst({
      where: {
        projectSlug: context.params.project,
        publicProject: true,
        user: {
          slug: context.params.slug,
        },
      },
      include: {
        collaborators: true,
        images: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!projectData) {
      return {
        props: {
          error: 404,
        },
        revalidate: revalidationErrorTime,
      };
    }

    const { initialDate, finalDate, skills, ...pj } = projectData;

    const proj = {
      ...pj,
      slug: context.params.slug,
      initialDate: initialDate ? new Date(initialDate).getTime() : null,
      finalDate: finalDate ? new Date(finalDate).getTime() : null,
      skills: skills.map((sk) => sk.skill),
    };

    const profileData = await prisma.user.findFirst({
      where: {
        slug: context.params.slug,
        publicProfile: true,
      },
      select: {
        theme: true,
      },
    });

    if (!profileData) {
      return {
        props: {
          error: 404,
        },
        revalidate: revalidationErrorTime,
      };
    }

    const language = await getLanguageByLocale(context.locale, languageLocales);
    const { theme } = profileData;
    const props = { language, theme, project: proj };

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
