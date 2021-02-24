// libs
import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// Languages (dates)
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-US';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../i18n/locales/profile/project.es.json';
import EN from '../../../i18n/locales/profile/project.en.json';
// components
import { EditProject } from '../../../views/index';
import { LangContext } from '../../../store/contexts/langContext';

import prisma from '../../../prisma/prisma.instance';

const dateLocales = {
  en: enLocale,
  es: esLocale,
};
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

const Cmp = (props) => {
  const { language } = props;

  if (!language) {
    return <></>;
  }

  return (
    <LangContext.Provider value={language}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocales[language.locale]}>
        <EditProject open handleClose={() => {}} />
      </MuiPickersUtilsProvider>
    </LangContext.Provider>
  );
};

Cmp.propTypes = {
  language: PropTypes.shape(PropTypes.object),
};
Cmp.defaultProps = {
  language: null,
};

export default Cmp;
