/* eslint-disable react/prop-types */
import React from 'react';
import Error from 'next/error';
import {
  getLanguageByLocale,
  // eslint-disable-next-line import/named
} from '../../backend/preRenderingData';
import { Profile } from '../../views';
import ProfileProvider from '../../store/contexts/profileContext';
import { LangContext } from '../../store/contexts/langContext';
import ES from '../../i18n/locales/profilePage/profile.es.json';
import EN from '../../i18n/locales/profilePage/profile.en.json';
import { revalidationErrorTime, revalidationTime } from '../../constants/pageRevalidationTime';
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
  });

  return {
    paths: publicProfiles.map((user) => ({
      params: {
        slug: user.slug,
      },
    })),
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  try {
    const profileData = await prisma.user.findFirst({
      where: {
        slug: context.params.slug,
        publicProfile: true,
      },
      include: {
        Project: {
          where: {
            publicProject: true,
          },
          include: {
            // collaborators: true,
            images: true,
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
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
    const { createdAt, updatedAt, Project, ...userData } = profileData;
    const projects = Project.map((p) => {
      const { initialDate, finalDate, skills, ...projectData } = p;

      return {
        ...projectData,
        slug: userData.slug,
        initialDate: initialDate ? new Date(initialDate).getTime() : null,
        finalDate: finalDate ? new Date(finalDate).getTime() : null,
        skills: skills.map((sk) => sk.skill),
      };
    });

    const profile = {
      ...userData,
      projects,
    };

    const language = await getLanguageByLocale(context.locale, languageLocales);
    const { theme } = profile;

    const profileSkills = profile.projects.reduce((acum, project) => {
      project.skills.forEach((sk) => {
        if (acum[sk.name]) {
          acum[sk.name].cant = acum[sk.name].cant + 1;
        } else {
          acum = {
            ...acum,
            [sk.name]: {
              cant: 1,
              category: sk.category,
            },
          };
        }
      });
      return acum;
    }, {});

    const skills = Object.keys(profileSkills)
      .map((skill) => ({
        skill,
        ...profileSkills[skill],
      }))
      .sort((a, b) => b.cant - a.cant);

    const props = { language, theme, profile: { user: profile, skills } };

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
        <Profile edit={false} />
      </ProfileProvider>
    </LangContext.Provider>
  );
};

export default Slug;
