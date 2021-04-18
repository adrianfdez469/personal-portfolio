/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
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

import { useMainViewSyles } from './styles';

const Stepper = dynamic(() => import('@material-ui/core/Stepper'));
const CloseIcon = dynamic(() => import('@material-ui/icons/Close'));
const ArrowBackIosIcon = dynamic(() => import('@material-ui/icons/ArrowBackIos'));
const ArrowForwardIosIcon = dynamic(() => import('@material-ui/icons/ArrowForwardIos'));
const SaveIcon = dynamic(() => import('@material-ui/icons/Save'));

const initialState = {
  activeStep: 0,
};
const actions = {
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  GO_START: 'GO_START',
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
    case actions.GO_START:
      return initialState;
    default:
      return state;
  }
};

const EditProjectView = (props) => {
  const { handleClose, lang, Steps, onSave } = props;
  // Hooks
  const style = useMainViewSyles();
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePrev = () => {
    if (state.activeStep - 1 >= 0) {
      dispatch({ type: actions.PREV_STEP });
    }
  };

  const handleNext = () => {
    if (state.activeStep + 1 < Steps.length) {
      dispatch({ type: actions.NEXT_STEP });
    } else {
      onSave();
      dispatch({ type: actions.GO_START });
    }
  };

  const mainContent = (
    <>
      {greaterMdSize ? (
        <Stepper activeStep={state.activeStep} alternativeLabel className={style.stepper}>
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
            dot: style.dotMobileStepper,
            dotActive: style.dotActiveMobileStepper,
            root: style.rootMobileStepper,
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
        {Steps.map((stepForm, index) => (
          <div key={stepForm.label} hidden={state.activeStep !== index}>
            {stepForm.cmp}
          </div>
        ))}
      </div>

      {greaterMdSize ? (
        <Box className={style.buttonsContainer}>
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
        <div className={style.mobileBottonSpacer} />
      )}
    </>
  );

  return (
    <>
      <AppBar className={style.appBar}>
        <Toolbar>
          <Typography variant="button" className={style.title}>
            {lang.title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {!greaterMdSize && (
        <Paper square elevation={0} className={style.mobileStepHeader}>
          <Typography align="center" color="primary">
            {Steps[state.activeStep].label}
          </Typography>
        </Paper>
      )}
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          className={style.paper}
          style={{ display: greaterMdSize ? 'block' : 'contents' }}
        >
          {mainContent}
          {!greaterMdSize && <div className={style.mobileBottonSpacer} />}
        </Paper>
      </Container>
    </>
  );
};

EditProjectView.propTypes = {
  handleClose: PropTypes.func.isRequired,
  lang: PropTypes.shape(PropTypes.object).isRequired,
  Steps: PropTypes.arrayOf(
    PropTypes.shape({ cmp: PropTypes.element.isRequired, label: PropTypes.string.isRequired })
      .isRequired
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProjectView;
