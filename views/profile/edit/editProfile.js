/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
// libs
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';
import StepForm from '../../../components/UI/StepForm';
import SyncForm from './steps/syncronization';
import PersonalDataForm from './steps/personalData';
import ContactDataForm from './steps/contactData';
import { useLang } from '../../../store/contexts/langContext';
import { useChangeProfile, useProfile } from '../../../store/contexts/profileContext';

const saveUserProfileQuery = `
  mutation updateUser($userId: ID!, $user: UserParams!) {
    updateUser(userId: $userId, user: $user){
      code
      success
      message
      user {
        id
        name
        image
        title
        description
        slug
        publicProfile
        theme
        email
        phone
        gitlabLink
        githubLink
        linkedinLink
        twitterLink
        experience
      }
    }
  }
`;

const initialState = {
  data: {
    avatarUrl: null,
    personalData: {
      name: '',
      title: '',
      description: '',
      birthday: null,
      gender: null,
      experience: 0,
    },
    contactData: {
      email: '',
      phone: '',
      gitlab: null,
      linkedin: null,
      twitter: null,
      github: null,
    },
  },
  saving: false,
  error: false,
};
const actions = {
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  START_SAVING: 'START_SAVING',
  END_SAVING: 'END_SAVING',
  ERROR_SAVING: 'ERROR_SAVING',

  EDIT_AVATAR_DATA: 'EDIT_AVATAR_DATA',
  EDIT_PERSONAL_DATA: 'EDIT_PERSONAL_DATA',
  EDIT_CONTACT_DATA: 'EDIT_CONTACT_DATA',
  SET_PROVIDER_DATA: 'SET_PROVIDER_DATA',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.NEXT_STEP:
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    case actions.PREV_STEP:
      return {
        ...state,
        activeStep: state.activeStep - 1,
      };
    case actions.START_SAVING:
      return {
        ...state,
        saving: true,
      };
    case actions.ERROR_SAVING:
      return {
        ...state,
        error: true,
        saving: false,
      };
    case actions.END_SAVING:
      return {
        ...state,
        activeStep: 0,
        saving: false,
        error: false,
      };
    case actions.EDIT_AVATAR_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          avatarUrl: action.value,
        },
      };
    case actions.EDIT_PERSONAL_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          personalData: {
            ...state.data.personalData,
            [action.field]: action.value,
          },
        },
      };
    case actions.EDIT_CONTACT_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          contactData: {
            ...state.data.contactData,
            [action.field]: action.value,
          },
        },
      };
    case actions.SET_PROVIDER_DATA:
      return {
        ...state,
        data: {
          avatarUrl: state.data.avatarUrl,
          personalData: {
            name: action.value.name,
            title: action.value.title,
            description: action.value.about,
            birthday: action.value.birthdate,
            gender: action.value.gender,
            experience: action.value.experience,
          },
          contactData: {
            email: action.value.email,
            phone: action.value.phone,
            gitlab: action.value.gitlabUrl,
            linkedin: action.value.linkedinUrl,
            twitter: action.value.twitterUrl,
            github: action.value.githubUrl,
          },
        },
      };
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  const { handleClose } = props;
  // Hooks
  const { lang } = useLang();
  const { user } = useProfile();
  const changeProfile = useChangeProfile();
  console.log(user);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data: {
      ...initialState.data,
      avatarUrl: user.image,
      personalData: {
        ...initialState.data.personalData,
        name: user.name,
        title: user.title,
        description: user.description,
        experience: user.experience,
        birthday: user.birthday,
        gender: user.gender,
      },
      contactData: {
        email: user.email,
        phone: user.phone,
        gitlab: user.gitlabLink,
        linkedin: user.linkedinLink,
        twitter: user.twitterLink,
        github: user.githubLink,
      },
    },
  });

  const handleSave = () => {
    console.log(state);
    dispatch({ type: actions.START_SAVING });

    getSession()
      .then((session) => {
        if (session && session.userId) {
          return fetch('/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: saveUserProfileQuery,
              variables: {
                userId: session.userId,
                user: {
                  name: state.data.personalData.name,
                  email: state.data.contactData.email,
                  image: state.data.avatarUrl,
                  title: state.data.personalData.title,
                  description: state.data.personalData.description,
                  experience: state.data.personalData.experience,
                  birthday: state.data.personalData.birthday
                    ? new Date(state.data.personalData.birthday).toISOString()
                    : null,
                  gender: state.data.personalData.gender,
                  twitterLink: state.data.contactData.twitter,
                  linkedinLink: state.data.contactData.linkedin,
                  githubLink: state.data.contactData.github,
                  gitlabLink: state.data.contactData.gitlab,
                  phone: state.data.contactData.phone,
                },
              },
            }),
          });
        }
        throw new Error('NO_SESSION_AVAILABLE');
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('ERROR_TO_FETCH');
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.updateUser.success) {
          dispatch({ type: actions.END_SAVING });
          changeProfile(resp.data.updateUser.user); // .....
          return;
        }
        throw new Error('ERROR_TO_FETCH');
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actions.ERROR_SAVING });
      });
  };
  const handleEditPersonalData = (field, value) => {
    dispatch({ type: actions.EDIT_PERSONAL_DATA, field, value });
  };
  const handleEditContactData = (field, value) => {
    dispatch({ type: actions.EDIT_CONTACT_DATA, field, value });
  };

  const setProvidersData = (data) => {
    dispatch({ type: actions.SET_PROVIDER_DATA, value: data });
  };
  const setProvidersAvatar = (avatarUrl) => {
    dispatch({ type: actions.EDIT_AVATAR_DATA, value: avatarUrl });
  };

  const Steps = [
    {
      cmp: <SyncForm setProvidersData={setProvidersData} setProvidersAvatar={setProvidersAvatar} />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: <PersonalDataForm data={state.data.personalData} edit={handleEditPersonalData} />,
      label: lang.step.personalData,
    },
    {
      cmp: <ContactDataForm data={state.data.contactData} edit={handleEditContactData} />,
      label: lang.step.contactData,
    },
  ];

  return (
    <>
      <StepForm handleClose={handleClose} Steps={Steps} lang={lang} onSave={handleSave} />
    </>
  );
};

EditProjectView.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default EditProjectView;
