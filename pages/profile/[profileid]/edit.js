/* eslint-disable react/prop-types */
import React from 'react';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProfileProvider from '../../../store/contexts/profileContext';
import { LangContext } from '../../../store/contexts/langContext';
import {
  getLanguageByLocale,
  getProfileDataById,
  // eslint-disable-next-line import/named
} from '../../../backend/preRenderingData';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../i18n/locales/pageProfileForm/profile.es.json';
import EN from '../../../i18n/locales/pageProfileForm/profile.en.json';
import EditProfile from '../../../views/profile/edit/editProfile';

const languageLocales = {
  en: EN,
  es: ES,
};

const createPropsObject = async (context) => {
  try {
    const session = await getSession(context);

    const language = await getLanguageByLocale(context.locale, languageLocales);
    const profileData = await getProfileDataById(+session.userId);
    const { theme } = profileData.user;

    const resp = { language, theme, profile: profileData };

    return resp;
  } catch (err) {
    console.error(err);
  }
  return {};
};

export const getServerSideProps = async (context) => {
  const obj = await createPropsObject(context);

  return {
    props: obj,
  };
};

const Edit = (props) => {
  const { language, profile } = props;
  const router = useRouter();
  return (
    <LangContext.Provider value={language}>
      <ProfileProvider value={profile}>
        <EditProfile
          handleClose={() => {
            router.replace(`/profile/${router.query.profileid}`);
          }}
        />
      </ProfileProvider>
    </LangContext.Provider>
  );
};

export default Edit;
