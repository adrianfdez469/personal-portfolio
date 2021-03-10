import { makeStyles } from '@material-ui/core';

const useStepsStyles = makeStyles((theme) => ({
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
export default useStepsStyles;
