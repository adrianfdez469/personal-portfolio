/* eslint-disable import/named */
// libs
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../../i18n/locales/pageProjectForm/project.es.json';
import EN from '../../../../i18n/locales/pageProjectForm/project.en.json';
// components
import { EditProject } from '../../../../views/index';
import { LangContext } from '../../../../store/contexts/langContext';

import prisma from '../../../../prisma/prisma.instance';

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

export const getStaticPaths = async () => {
  // Cargar todos los usuarios
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: [
      ...users.map((user) => ({
        params: { profileid: user.id.toString() },
        locale: 'en',
      })),
      ...users.map((user) => ({
        params: { profileid: user.id.toString() },
        locale: 'es',
      })),
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { locale } = context;
  const { profileid } = context.params;
  const user = await prisma.user.findUnique({
    where: {
      id: +profileid,
    },
  });
  if (!user) {
    return { notFound: true };
  }

  const obj = { ...(await createPropsObject(locale)) };
  return {
    props: obj,
  };
};

const NewProject = (props) => {
  const { language } = props;
  const router = useRouter();

  if (!language) {
    return <></>;
  }

  return (
    <LangContext.Provider value={language}>
      <EditProject
        open
        handleClose={() => {
          router.replace(`/profile/${router.query.profileid}`);
        }}
      />
    </LangContext.Provider>
  );
};

NewProject.propTypes = {
  language: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NewProject;
