/* eslint-disable import/named */
// libs
import React from 'react';
import PropTypes from 'prop-types';
import { preRenderLanguage, preRenderUserTheme } from '../../../../backend/preRenderingData';
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
      initialDate: new Date(project.initialDate).getTime(),
      endDate: new Date(project.finalDate).getTime(),
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
    collaborators: [],
    images: project.images.map((image) => ({
      id: image.id,
      url: image.imageUrl,
    })),
    provider: null,
  };

  const obj = {
    language: await preRenderLanguage(context, languageLocales),
    theme: await preRenderUserTheme(context),
    projectData,
    projectId: +projectid,
  };
  return {
    props: obj,
  };
};

const NewProject = (props) => {
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

NewProject.propTypes = {
  language: PropTypes.objectOf(PropTypes.any).isRequired,
  projectData: PropTypes.objectOf(PropTypes.any).isRequired,
  projectId: PropTypes.number.isRequired,
};

export default NewProject;
