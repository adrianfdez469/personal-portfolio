/* eslint-disable import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import ProjectEditor from '../../../views/project';
import prisma from '../../../prisma/prisma.instance';

const createPropsObject = async (locale) => {
  const lang = locale;
  const language = {
    locale: lang,
    // eslint-disable-next-line global-require
    lang: await require(`../../../i18n/locales/${lang}/profile/project.json`),
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
    paths: users.map((user) => `/profile/${user.id}/newproject`),
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

  const obj = { ...(await createPropsObject(locale)), profileid };

  return {
    props: obj,
  };
};

const Cmp = (props) => {
  console.log(props);
  const { language, profileid } = props;
  if (!profileid) {
    return <></>;
  }
  return (
    <>
      <ProjectEditor open handleClose={() => {}} />
    </>
  );
};

Cmp.propTypes = {
  language: PropTypes.shape(PropTypes.object).isRequired,
  profileid: PropTypes.string.isRequired,
};

export default Cmp;
