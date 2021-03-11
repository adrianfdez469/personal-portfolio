/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
// libs
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import StepForm from '../../../components/UI/StepForm';
import SyncForm from './steps/syncronization';
import PersonalDataForm from './steps/personalData';
import ContactDataForm from './steps/contactData';
import { useLang } from '../../../store/contexts/langContext';

const initialState = {
  data: {
    personalData: {
      name: '',
      title: '',
      description: '',
      birthday: null,
      gender: null,
      avatarUrl: null,
    },
    contactData: {
      email: '',
      phone: '',
    },
    socialData: {
      linkedin: null,
      facebook: null,
      twitter: null,
      github: null,
      gitlab: null,
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
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  const { handleClose } = props;
  // Hooks
  const { lang } = useLang();

  const [state, dispatch] = useReducer(reducer, initialState);

  const Steps = [
    {
      cmp: <SyncForm />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: <PersonalDataForm />,
      label: lang.step.personalData,
    },
    {
      cmp: <ContactDataForm />,
      label: lang.step.contactData,
    },
  ];

  const handleSave = () => {
    dispatch({ type: actions.START_SAVING });
  };

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
