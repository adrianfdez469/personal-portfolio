import { makeStyles } from '@material-ui/core';

const useSyncStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(32),
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  formcontrolWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(800)]: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}));

export default useSyncStyles;
