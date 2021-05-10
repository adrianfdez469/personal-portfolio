/* eslint-disable import/named */
// libs
import React from 'react';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { getLanguageByLocale, getThemeByUserId } from '../../../../backend/preRenderingData';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../../i18n/locales/pageProjectForm/project.es.json';
import EN from '../../../../i18n/locales/pageProjectForm/project.en.json';
// components
import { EditProject } from '../../../../views/index';
import { LangContext } from '../../../../store/contexts/langContext';

const languageLocales = {
  en: EN,
  es: ES,
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (context) => {
  const { profileid } = context.params;

  const language = await getLanguageByLocale(context.locale, languageLocales);
  const theme = await getThemeByUserId(+profileid);
  const resp = { language, theme };

  return {
    props: resp,
  };
};

const NewProject = (props) => {
  // eslint-disable-next-line react/prop-types
  const { language } = props;
  const router = useRouter();

  if (!language) {
    return <></>;
  }

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      maxSnack={3}
    >
      <LangContext.Provider value={language}>
        <EditProject
          open
          handleClose={() => {
            router.replace(`/profile/${router.query.profileid}`);
          }}
        />
      </LangContext.Provider>
    </SnackbarProvider>
  );
};

export default NewProject;
