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
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
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
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const useStepsStyles = makeStyles((theme) => ({
  mainContent: {
    margin: theme.spacing(1),
  },
  stepDescriptor: {
    marginBottom: theme.spacing(2),
  },
}));

export const useSkillsStyles = makeStyles((theme) => ({
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const useLinksStyles = makeStyles((theme) => ({
  media: {
    height: 151,
    width: 151,
    // paddingTop: '56.25%',
  },
}));
