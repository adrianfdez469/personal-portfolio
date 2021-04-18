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
  },
  grid: {
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
    [theme.breakpoints.down(704)]: {
      justifyContent: 'center',
    },
    padding: theme.spacing(1),
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
  },
  dateRow: {
    fontSize: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: theme.spacing(1),
  },
  gridCardContainer: {
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  },
}));
