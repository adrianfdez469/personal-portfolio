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
import Transition from '../Transition';
import { syncObj, SyncForm } from './Steps/synchronizationStep';
import { basicInfoObj, BasicInfoForm } from './Steps/basicInfoStep';
import { galleryObj, GalleryForm } from './Steps/gallery';
import { skillsObj, SkillsForm } from './Steps/skillsStep';
import { collaboratorsObj, CollaboratorsForm } from './Steps/collaborators';
import { linksObj, LinksForm } from './Steps/linksStep';
import { othersObj, OthersForm } from './Steps/othersStep';
// styles
import { useMainViewSyles } from './styles';

// TODO: Prepare for responsive view

const Steps = [syncObj, basicInfoObj, galleryObj, skillsObj, collaboratorsObj, linksObj, othersObj];

const initialState = {
  activeStep: 0,
  completeSteps: [],
  form: {
    sync: {},
    info: {
      name: {
        value: null,
        valid: true,
      },
      initialDate: {
        value: null,
        valid: true,
      },
      endDate: {
        value: null,
        valid: true,
      },
      descripction: {
        value: null,
        valid: true,
      },
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        activeStep: state.activeStep + 1 < Steps.length ? state.activeStep + 1 : state.activeStep,
      };
    case 'PREV_STEP':
      return {
        ...state,
        activeStep: state.activeStep - 1 < 0 ? state.activeStep : state.activeStep - 1,
      };

    default:
      return state;
  }
};

const LayoutView = (props) => {
  const { open: openDialog, handleClose } = props;
  // Hooks
  const classes = useMainViewSyles();
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrev = () => {
    dispatch({ type: 'PREV_STEP' });
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
        <SyncForm stepId={Steps[state.activeStep].id} />
        <BasicInfoForm stepId={Steps[state.activeStep].id} />
        <GalleryForm stepId={Steps[state.activeStep].id} />
        <SkillsForm stepId={Steps[state.activeStep].id} />
        <CollaboratorsForm stepId={Steps[state.activeStep].id} />
        <LinksForm stepId={Steps[state.activeStep].id} />
        <OthersForm stepId={Steps[state.activeStep].id} />
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
            ATRAS
          </Button>
          <Button
            onClick={handleNext}
            color="primary"
            disabled={state.activeStep === Steps.length}
            variant="outlined"
            style={{ width: '100px', margin: '5px' }}
          >
            {state.activeStep === Steps.length - 1 ? 'GUARDAR' : 'SIGUIENTE'}
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
            Adicionar proyecto
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

LayoutView.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LayoutView;