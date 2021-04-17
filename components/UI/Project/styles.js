import { makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(1.6),
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2),
    },
  },
}));

export const useBodyStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  card: {
    margin: theme.spacing(2),
  },
}));
