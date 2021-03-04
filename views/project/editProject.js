// libs
import React, { useReducer, Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Container,
  IconButton,
  MobileStepper,
  Step,
  StepButton,
  Box,
  useMediaQuery,
} from '@material-ui/core';
// componets
import SyncForm from './steps/synchronization';
// hooks
import { useLang } from '../../store/contexts/langContext';
// styles
import { useMainViewSyles } from './styles';

// Dynamic imports to improve performance
const Stepper = dynamic(() => import('@material-ui/core/Stepper'));
const CloseIcon = dynamic(() => import('@material-ui/icons/Close'));
const ArrowBackIosIcon = dynamic(() => import('@material-ui/icons/ArrowBackIos'));
const ArrowForwardIosIcon = dynamic(() => import('@material-ui/icons/ArrowForwardIos'));
const SaveIcon = dynamic(() => import('@material-ui/icons/Save'));
const BasicInfoForm = dynamic(() => import('./steps/basicInfo'));
const GalleryForm = dynamic(() => import('./steps/gallery'));
const SkillsForm = dynamic(() => import('./steps/skills'));
const CollaboratorsForm = dynamic(() => import('./steps/collaborators'));

const saveQueryData = (data) => `
  mutation {
    createProject(
      project: ${data}
    )
  }
`;

const initialState = {
  activeStep: 0,
  data: {
    basicInfoData: {
      name: '',
      initialDate: null,
      endDate: null,
      description: '',
      otherText: '',
      proyectLink: {
        url: '',
        title: '',
        description: '',
        imageUrl: '',
      },
      devLink: {
        url: '',
        title: '',
        description: '',
        imageUrl: '',
      },
    },
    skillsData: {
      languages: [],
      technologies: [],
    },
    collaborators: [],
    images: [],
    provider: null,
  },
  saving: false,
  error: false,
};
const actions = {
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  SET_REPOSITORY_DATA: 'SET_REPOSITORY_DATA',
  START_SAVING: 'START_SAVING',
  END_SAVING: 'END_SAVING',
  ERROR_SAVING: 'ERROR_SAVING',
  ADD_STEPS: 'ADD_STEPS',

  CHANGE_BASIC_DATA: 'CHANGE_BASIC_DATA',
  CHANGE_SKILLS_DATA: 'CHANGE_SKILLS_DATA',
  CHANGE_COLLABORATORS_DATA: 'CHANGE_COLLABORATORS_DATA',
  CHANGE_IMAGES_DATA: 'CHANGE_IMAGES_DATA',
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
    case actions.SET_REPOSITORY_DATA:
      return {
        ...state,
        data: action.data,
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
        activeStep: 0,
        data: {
          basicInfoData: null,
          skillsData: null,
          links: null,
          collaborators: null,
        },
        saving: false,
        error: false,
      };
    case actions.ADD_STEPS:
      return {
        ...state,
        Steps: action.data,
      };
    case actions.CHANGE_BASIC_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          basicInfoData: {
            ...state.data.basicInfoData,
            ...action.data,
          },
        },
      };
    case actions.CHANGE_SKILLS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          skillsData: {
            ...state.data.skillsData,
            ...action.data,
          },
        },
      };
    case actions.CHANGE_COLLABORATORS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          collaborators: action.data,
        },
      };
    case actions.CHANGE_IMAGES_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          images: action.data,
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
  const classes = useMainViewSyles();
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const [state, dispatch] = useReducer(reducer, initialState);

  const setRepoSyncData = useCallback(
    (data) => {
      console.log(data);

      const basicInfoData = {
        ...initialState.data.basicInfoData,
        name: data.name || '',
        initialDate: data.createdAt ? new Date(data.createdAt).getTime() : null,
        description: data.description || '',
        devLink: {
          ...initialState.data.basicInfoData.devLink,
          url: data.url || '',
        },
        proyectLink: {
          ...initialState.data.basicInfoData.proyectLink,
          url: data.deploymentUrl || '',
        },
      };
      const skillsData = {
        ...initialState.data.skillsData,
        languages: data.languages.length > 0 ? data.languages.map((lg) => ({ text: lg })) : [],
      };
      const collaborators = data.collaborators.length === 0 ? null : data.collaborators;

      const fullData = {
        basicInfoData: { ...basicInfoData },
        skillsData: { ...skillsData },
        collaborators,
        provider: data.provider,
      };
      dispatch({ type: actions.SET_REPOSITORY_DATA, data: fullData });
    },
    [dispatch]
  );

  const handleChangeBasicInfoData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_BASIC_DATA, data: data });
    },
    [dispatch]
  );
  const handleChangeSkillsData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_SKILLS_DATA, data: data });
    },
    [dispatch]
  );
  const handleChangeCollaboratorsData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_COLLABORATORS_DATA, data: data });
    },
    [dispatch]
  );
  const handleChangeImagesData = useCallback(
    (data) => {
      dispatch({ type: actions.CHANGE_IMAGES_DATA, data: data });
    },
    [dispatch]
  );

  const Steps = [
    {
      cmp: <SyncForm show={state.activeStep === 0} selectRepo={setRepoSyncData} />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: (
        <BasicInfoForm
          show={state.activeStep === 1}
          data={state.data.basicInfoData}
          changeData={handleChangeBasicInfoData}
        />
      ),
      label: lang.step.infoLabel,
    },
    {
      cmp: (
        <SkillsForm
          show={state.activeStep === 2}
          data={state.data.skillsData}
          changeData={handleChangeSkillsData}
        />
      ),
      label: lang.step.sillsLabel,
    },
    {
      cmp: (
        <CollaboratorsForm
          show={state.activeStep === 3}
          collaborators={state.data.collaborators}
          changeData={handleChangeCollaboratorsData}
        />
      ),
      label: lang.step.collaboratorsLabel,
    },
    {
      cmp: (
        <GalleryForm
          show={state.activeStep === 4}
          images={state.data.images}
          changeData={handleChangeImagesData}
        />
      ),
      label: lang.step.galeryLabel,
    },
  ];

  const handleNext = () => {
    if (state.activeStep + 1 < Steps.length) {
      dispatch({ type: actions.NEXT_STEP });
    } else {
      dispatch({ type: actions.START_SAVING });
      // TODO: Fetch to save

      console.log(state);
    }
  };

  const handlePrev = () => {
    if (state.activeStep - 1 >= 0) {
      dispatch({ type: actions.PREV_STEP });
    }
  };

  const mainContent = (
    <>
      {greaterMdSize ? (
        <Stepper activeStep={state.activeStep} alternativeLabel className={classes.stepper}>
          {Steps.map((step) => (
            <Step key={step.label}>
              <StepButton>{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <MobileStepper
          activeStep={state.activeStep}
          steps={Steps.length}
          variant="dots"
          position="bottom"
          classes={{
            dot: classes.dotMobileStepper,
            dotActive: classes.dotActiveMobileStepper,
            root: classes.rootMobileStepper,
          }}
          backButton={
            <IconButton onClick={handlePrev} color="primary" disabled={state.activeStep === 0}>
              <ArrowBackIosIcon />
            </IconButton>
          }
          nextButton={
            <IconButton
              onClick={handleNext}
              color={state.activeStep === Steps.length - 1 ? 'secondary' : 'primary'}
              disabled={state.activeStep === Steps.length}
            >
              {state.activeStep === Steps.length - 1 ? <SaveIcon /> : <ArrowForwardIosIcon />}
            </IconButton>
          }
        >
          {Steps.map((step) => (
            <Step key={step.label}>
              <StepButton>{step.label}</StepButton>
            </Step>
          ))}
        </MobileStepper>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Steps.map((stepForm) => (
          <Fragment key={stepForm.label}>{stepForm.cmp}</Fragment>
        ))}
      </div>

      {greaterMdSize ? (
        <Box className={classes.buttonsContainer}>
          <Button
            onClick={handlePrev}
            color="primary"
            disabled={state.activeStep === 0}
            variant="outlined"
            style={{ width: '100px', margin: '5px' }}
          >
            {lang.back}
          </Button>
          <Button
            onClick={handleNext}
            color={state.activeStep === Steps.length - 1 ? 'secondary' : 'primary'}
            disabled={state.activeStep === Steps.length}
            variant="outlined"
            style={{ width: '100px', margin: '5px' }}
          >
            {state.activeStep === Steps.length - 1 ? lang.save : lang.next}
          </Button>
        </Box>
      ) : (
        <div className={classes.mobileBottonSpacer} />
      )}
    </>
  );

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="button" className={classes.title}>
            {lang.title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {!greaterMdSize && (
        <Paper square elevation={0} className={classes.mobileStepHeader}>
          <Typography align="center" color="primary">
            {Steps[state.activeStep].label}
          </Typography>
        </Paper>
      )}
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          className={classes.paper}
          style={{ display: greaterMdSize ? 'block' : 'contents' }}
        >
          {mainContent}
          {!greaterMdSize && <div className={classes.mobileBottonSpacer} />}
        </Paper>
      </Container>
    </>
  );
};

EditProjectView.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditProjectView;
