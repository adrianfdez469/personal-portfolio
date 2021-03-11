import React from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ProfileContext } from '../../../store/contexts/profileContext';
import { LangContext } from '../../../store/contexts/langContext';
// Languages (Estos son usados en los metodos getStaticProps, por lo que no son incluidos en el frontend)
import ES from '../../../i18n/locales/pageProfileForm/profile.es.json';
import EN from '../../../i18n/locales/pageProfileForm/profile.en.json';
import EditProfile from '../../../views/profile/edit/editProfile';

const languageLocales = {
  en: EN,
  es: ES,
};

const queryUserData = (id) => `
  {
    user(id: ${id}) {
      id
      name
      image
      title
      description
      slug
    }
  }
`;

const createPropsObject = async (context) => {
  const lang = context.locale;

  const session = await getSession(context);
  try {
    const language = {
      locale: lang,
      lang: languageLocales[context.locale],
    };

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryUserData(session.userId),
      }),
    });
    if (!response.ok) {
      throw new Error('Error');
    }

    const resp = await response.json();
    return { language, profile: resp.data };
  } catch (err) {
    console.log(err);
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
      <ProfileContext.Provider value={profile}>
        <EditProfile
          handleClose={() => {
            router.back();
          }}
        />
      </ProfileContext.Provider>
    </LangContext.Provider>
  );
};

Edit.propTypes = {
  language: PropTypes.shape(PropTypes.any).isRequired,
  profile: PropTypes.shape(PropTypes.any).isRequired,
};

export default Edit;
