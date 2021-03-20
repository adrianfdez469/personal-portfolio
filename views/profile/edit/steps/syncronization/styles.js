import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  spinner: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4, 2),
    },
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}));

export default useStyles;
