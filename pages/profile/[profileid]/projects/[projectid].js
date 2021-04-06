/* eslint-disable import/named */
// libs
import React from 'react';
import { getLanguageByLocale, getThemeByContext } from '../../../../backend/preRenderingData';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../../i18n/locales/pageProjectForm/project.es.json';
import EN from '../../../../i18n/locales/pageProjectForm/project.en.json';
// components
import { EditProject } from '../../../../views/index';
import { LangContext } from '../../../../store/contexts/langContext';
import SkillsCategorysConst from '../../../../constants/skillsCategorysConst';
import prisma from '../../../../prisma/prisma.instance';

const languageLocales = {
  en: EN,
  es: ES,
};

export const getServerSideProps = async (context) => {
  const { projectid } = context.params;

  const project = await prisma.project.findUnique({
    include: {
      skills: {
        select: {
          skill: true,
        },
      },
      images: true,
      collaborators: true,
    },
    where: {
      id: +projectid,
    },
  });
  if (!project) {
    return { notFound: true };
  }

  const projectData = {
    basicInfoData: {
      name: project.name,
      initialDate: project.initialDate ? new Date(project.initialDate).getTime() : null,
      endDate: project.finalDate ? new Date(project.finalDate).getTime() : null,
      description: project.description,
      otherText: project.otherInfo,
      proyectLink: {
        url: project.projectLink,
        title: '',
        description: '',
        imageUrl: '',
      },
      devLink: {
        url: project.projectDevLink,
        title: '',
        description: '',
        imageUrl: '',
      },
    },
    skillsData: {
      languages: project.skills
        .filter((obj) => obj.skill.category === SkillsCategorysConst.PROG_LANG)
        .map((obj) => ({
          text: obj.skill.name,
          id: obj.skill.id,
          category: obj.skill.category,
        })),
      technologies: project.skills
        .filter((obj) => obj.skill.category === SkillsCategorysConst.PROG_TECH)
        .map((obj) => ({
          text: obj.skill.name,
          id: obj.skill.id,
          category: obj.skill.category,
        })),
    },
    collaborators: project.collaborators,
    images: project.images.map((image) => ({
      id: image.id,
      url: image.imageUrl,
    })),
    provider: null,
  };

  const obj = {
    language: await getLanguageByLocale(context.locale, languageLocales),
    theme: await getThemeByContext(context),
    projectData,
    projectId: +projectid,
  };
  return {
    props: obj,
  };
};

const NewProject = (props) => {
  // eslint-disable-next-line react/prop-types
  const { language, projectData, projectId } = props;

  if (!language) {
    return <></>;
  }

  return (
    <LangContext.Provider value={language}>
      <EditProject open data={projectData} projectId={projectId} handleClose={() => {}} />
    </LangContext.Provider>
  );
};

export default NewProject;
