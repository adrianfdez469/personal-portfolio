import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up(800)]: {
      flexDirection: 'row',
      height: 100,
      justifyContent: 'flex-start',
    },
  },
  linkField: {
    minWidth: '40%',
  },
  prevDataContainer: {
    minWidth: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    margin: theme.spacing(2),
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
    width: theme.spacing(6.25),
    height: theme.spacing(6.25),
    marginRight: theme.spacing(1),
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up(800)]: {
      marginLeft: theme.spacing(1),
    },
  },
  typografy: {
    fontSize: theme.spacing(1.2),
    [theme.breakpoints.up[800]]: {
      fontSize: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
