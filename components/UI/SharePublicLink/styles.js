import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  flexRow: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  butotonMargin: {
    margin: theme.spacing(0, 0, 0, 0),
    padding: theme.spacing(0.2),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
  publicButton: {
    margin: theme.spacing(2, 0, 0, 0),
  },
}));

export default useStyles;
