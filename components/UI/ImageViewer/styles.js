import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 999,
    overflow: 'hidden',
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 'auto',
    margin: theme.spacing(0, 2),
  },
  imageContainer: {
    width: '100%',
    minHeight: '75vh',
    overflow: 'auto',
  },
  buttonsBar: {
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
