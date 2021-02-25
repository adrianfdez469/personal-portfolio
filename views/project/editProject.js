// libs
import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  /* Dialog,
  DialogContent,
  DialogActions, */
  Button,
  /* AppBar,
  Toolbar, */
  Typography,
  Paper,
  Container,
  IconButton,
  Stepper,
  MobileStepper,
  Step,
  StepButton,
  Box,
  useMediaQuery,
} from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SaveIcon from '@material-ui/icons/Save';

// componets
// import Transition from '../../components/UI/Transition';
import SyncForm from './steps/synchronization';
// import BasicInfoForm from './steps/basicInfo';
//import GalleryForm from './steps/gallery';
//import SkillsForm from './steps/skills';
//import CollaboratorsForm from './steps/collaborators';
// hooks
import { useLang } from '../../store/contexts/langContext';
// styles
import { useMainViewSyles } from './styles';

const initialState = {
  activeStep: 0,
  data: {
    basicInfoData: null,
    skillsData: null,
    collaborators: null,
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
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  // const { open: openDialog, handleClose } = props;
  // Hooks
  const { lang } = useLang();
  const classes = useMainViewSyles();
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const [state, dispatch] = useReducer(reducer, initialState);

  const BasicInfoForm = useRef(null);
  const GalleryForm = useRef(null);
  const SkillsForm = useRef(null);
  const CollaboratorsForm = useRef(null);

  const setRepoSyncData = (data) => {
    const basicInfoData = {
      ...(data.name && { name: data.name }),
      ...(data.createdAt && { initialDate: new Date(data.createdAt).getTime() }),
      ...(data.description && { description: data.description }),
      ...(data.url && { url: data.url }),
      ...(data.deploymentUrl && { deployUrl: data.deploymentUrl }),
    };
    const skillsData = {
      ...(data.languages.length > 0 && { languages: data.languages.map((lg) => ({ text: lg })) }),
    };
    const collaborators = data.collaborators.length === 0 ? null : data.collaborators;

    const fullData = {
      basicInfoData: { ...basicInfoData },
      skillsData: { ...skillsData },
      collaborators,
      provider: data.provider,
    };
    dispatch({ type: actions.SET_REPOSITORY_DATA, data: fullData });
  };

  useEffect(() => {
    const imports = [
      import('./steps/basicInfo'),
      import('./steps/gallery'),
      import('./steps/skills'),
      import('./steps/collaborators'),
    ];
    Promise.all(imports)
      .then((components) => {
        [
          BasicInfoForm.current,
          GalleryForm.current,
          SkillsForm.current,
          CollaboratorsForm.current,
        ] = components.map((cmp) => cmp.default);
      })
      .catch((err) => console.log(err));
  }, []);

  const Steps = [
    {
      cmp: <SyncForm show={state.activeStep === 0} selectRepo={setRepoSyncData} />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: BasicInfoForm.current ? (
        <BasicInfoForm.current show={state.activeStep === 1} data={state.data.basicInfoData} />
      ) : null,
      label: lang.step.infoLabel,
    },
    {
      cmp: GalleryForm.current ? <GalleryForm.current show={state.activeStep === 2} /> : null,
      label: lang.step.galeryLabel,
    },
    {
      cmp: SkillsForm.current ? (
        <SkillsForm.current show={state.activeStep === 3} data={state.data.skillsData} />
      ) : null,
      label: lang.step.sillsLabel,
    },
    {
      cmp: CollaboratorsForm.current ? (
        <CollaboratorsForm.current
          show={state.activeStep === 4}
          collaborators={state.data.collaborators}
        />
      ) : null,
      label: lang.step.collaboratorsLabel,
    },
  ];

  const handleNext = () => {
    if (state.activeStep + 1 < Steps.length) {
      dispatch({ type: actions.NEXT_STEP });
    } else {
      dispatch({ type: actions.START_SAVING });
      // TODO: Fetch to save
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
              color="primary"
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
        {Steps.map((stepForm) => stepForm.cmp)}
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
            color="primary"
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
      {/* <Dialog fullScreen open={openDialog} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {lang.title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
  </AppBar>
      
      <DialogContent className={classes.dialog}> */}

      {!greaterMdSize && (
        <Paper square elevation={0} className={classes.mobileStepHeader}>
          <Typography align="center" color="primary">
            {Steps[state.activeStep].label}
          </Typography>
        </Paper>
      )}
      <Container maxWidth="lg">
        {greaterMdSize ? (
          <Paper elevation={3} className={classes.paper}>
            {mainContent}
          </Paper>
        ) : (
          <>{mainContent}</>
        )}
      </Container>
      {/* </DialogContent>
      <DialogActions />
      </Dialog> */}
    </>
  );
};

EditProjectView.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditProjectView;
