import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const usePersonDataStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(1.6),
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2),
    },
  },
  editableButtonsIcons: {
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.background.paper,
      width: theme.spacing(2.5),
      padding: 0,
    },
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.background.paper,
      width: theme.spacing(2),
      padding: 0,
    },
  },
  tag: {
    borderRadius: theme.spacing(0.5),
    boxShadow: `0 0 5px ${green[400]}`,
    backgroundColor: green[500],
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1),
    textAlign: 'center',
  },
}));

export const useProjectBoxStyles = makeStyles((theme) => ({
  grid: {
    width: 'auto',
    margin: theme.spacing(1, -1),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1, 2),
    },
    justifyContent: 'space-between',
    [theme.breakpoints.down(704)]: {
      margin: theme.spacing(1, 0),
      justifyContent: 'center',
    },
  },
  card: {
    width: theme.spacing(38),
    height: '100%',
    display: 'inline-grid',
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 2),
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  /* avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  }, */
  description: {
    textAlign: 'justify',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
    margin: theme.spacing(1, 0),
  },
  mediaNew: {
    paddingTop: '80%',
  },
  skills: {
    display: 'block',
    textAlign: 'justify',
  },
}));
