// libs
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  AppBar,
  Toolbar,
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
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SaveIcon from '@material-ui/icons/Save';

// componets
import Transition from '../../components/UI/Transition';
import SyncForm from './steps/synchronization';
import BasicInfoForm from './steps/basicInfo';
import GalleryForm from './steps/gallery';
import SkillsForm from './steps/skills';
import CollaboratorsForm from './steps/collaborators';
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
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  const { open: openDialog, handleClose } = props;
  // Hooks
  const classes = useMainViewSyles();
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lang } = useLang();
  // const router = useRouter();
  // const { profileid } = router.query;

  const setRepoSyncData = (provider, data) => {
    const basicInfoData = {
      ...(data.name && { name: data.name }),
      ...(data.createdAt && { initialDate: new Date(data.createdAt).getTime() }),
      ...(data.description && { description: data.description }),
      ...(data.url && { url: data.url }),
      ...(data.deployments.nodes.length > 0 && {
        deployUrl: data.deployments.nodes[0].latestStatus.environmentUrl,
      }),
    };
    const skillsData = {
      ...(data.languages.nodes.length > 0 && {
        languages: data.languages.nodes.map((programingLang) => ({ text: programingLang.name })),
      }),
    };
    const collaborators =
      data.mentionableUsers.nodes.length === 0
        ? null
        : data.mentionableUsers.nodes.map((collaborator) => ({
            name: collaborator.name,
            avatarUrl: collaborator.avatarUrl,
            url: collaborator.url,
            bio: collaborator.bio,
            email: collaborator.email,
            isOwner: data.owner.login === collaborator.login,
          }));

    const fullData = {
      basicInfoData: { ...basicInfoData },
      skillsData: { ...skillsData },
      collaborators,
    };
    dispatch({ type: actions.SET_REPOSITORY_DATA, data: fullData });
  };

  const Steps = [
    {
      cmp: <SyncForm selectRepo={setRepoSyncData} show={state.activeStep === 0} />,
      label: lang.step.syncyLabel,
    },
    {
      cmp: <BasicInfoForm show={state.activeStep === 1} data={state.data.basicInfoData} />,
      label: lang.step.infoLabel,
    },
    {
      cmp: <GalleryForm show={state.activeStep === 2} />,
      label: lang.step.galeryLabel,
    },
    {
      cmp: <SkillsForm show={state.activeStep === 3} data={state.data.skillsData} />,
      label: lang.step.sillsLabel,
    },
    {
      cmp: (
        <CollaboratorsForm show={state.activeStep === 4} collaborators={state.data.collaborators} />
      ),
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
    <Dialog fullScreen open={openDialog} onClose={handleClose} TransitionComponent={Transition}>
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

      <DialogContent className={classes.dialog}>
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
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

EditProjectView.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditProjectView;
