import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  linkField: {
    minWidth: '40%',
  },
  prevDataContainer: {
    minWidth: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    margin: theme.spacing(1),
  },
  divProcessing: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: theme.spacing(2),
  },
  image: {
    borderRadius: theme.spacing(0.5),
    width: ({ logoScale }) => theme.spacing(6.25 * logoScale),
    height: ({ logoScale }) => theme.spacing(6.25 * logoScale),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(800)]: {
      marginLeft: theme.spacing(1),
    },
  },
  typografy: {
    fontSize: ({ scale }) => theme.spacing(1.2 * scale),
    [theme.breakpoints.up[800]]: {
      fontSize: ({ scale }) => theme.spacing(1.5 * scale),
    },
  },
}));

export default useStyles;
