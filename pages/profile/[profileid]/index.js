import React from 'react';
import { getSession } from 'next-auth/client';
import { Profile } from '../../../views';
import ProfileProvider from '../../../store/contexts/profileContext';
import { LangContext } from '../../../store/contexts/langContext';
import {
  getLanguageByLocale,
  getThemeByThemeKey,
  getProfileDataById,
  // eslint-disable-next-line import/named
} from '../../../backend/preRenderingData';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../i18n/locales/editProfilePage/profile.es.json';
import EN from '../../../i18n/locales/editProfilePage/profile.en.json';

const languageLocales = {
  en: EN,
  es: ES,
};

const createPropsObject = async (context) => {
  try {
    const session = await getSession(context);
    if (context.query.profileid.toString() !== session.userId.toString()) {
      return {
        notFound: true,
      };
    }
    const language = await getLanguageByLocale(context.locale, languageLocales);
    const profileData = await getProfileDataById(+session.userId, true);
    const theme = await getThemeByThemeKey(profileData.user.theme);
    const resp = { language, theme, profile: profileData };
    return resp;
  } catch (err) {
    console.error(err);
  }
  return {};
};

export const getServerSideProps = async (context) => {
  const obj = await createPropsObject(context);

  if (obj.notFound) {
    return obj;
  }

  return {
    props: obj,
  };
};

const ProfilePage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { language, profile } = props;
  return (
    <LangContext.Provider value={language}>
      <ProfileProvider value={profile}>
        <Profile edit />
      </ProfileProvider>
    </LangContext.Provider>
  );
};

export default ProfilePage;
