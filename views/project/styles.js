import { makeStyles } from '@material-ui/core';

export const useMainViewSyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    minHeight: '80vh',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: '90%',
  },
  stepDescriptionContainer: {
    display: 'flex',
  },
  mainContent: {
    margin: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(1),
  },
  rootMobileStepper: {
    backgroundColor: theme.palette.background.paper,
  },
  dotMobileStepper: {
    backgroundColor: theme.palette.grey[500],
  },
  dotActiveMobileStepper: {
    backgroundColor: theme.palette.primary.main,
  },
  dialog: {
    [theme.breakpoints.down('800')]: {
      padding: 0,
    },
  },
  mobileStepHeader: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  mobileBottonSpacer: {
    height: theme.spacing(6),
  },
}));

export const useStepsStyles = makeStyles((theme) => ({
  mainContent: {
    margin: theme.spacing(1),
  },
  stepDescriptor: {
    marginBottom: theme.spacing(2),
  },
  stepDescriptionText: {
    display: 'block',
    [theme.breakpoints.down('800')]: {
      lineHeight: theme.spacing(0.2),
      textTransform: 'none',
      textAlign: 'left',
    },
  },
}));
