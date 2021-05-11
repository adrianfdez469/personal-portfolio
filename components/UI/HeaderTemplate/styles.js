import { makeStyles } from '@material-ui/core';

const usePersonDataStyles = makeStyles((theme) => ({
  menu: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  north: {
    height: 'auto',
    background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      maxHeight: theme.spacing(15),
    },
  },
  south: {
    minHeight: theme.spacing(15),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 2),
    color: theme.palette.getContrastText(theme.palette.background.paper),
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 2, 1, 24),
    },
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  avatar: {
    margin: theme.spacing(2),
    zIndex: 999,
  },
  titleBox: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
  },
  headerPrimary: {
    color: theme.palette.background.default,
    fontSize: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(5),
    },
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  headerSecondary: {
    color: theme.palette.background.paper,
    fontSize: theme.spacing(1.6),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(3),
    },
  },
  text: {
    fontSize: theme.spacing(1.8),
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2.5),
    },
  },
  editButtonsDesktop: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  editButtonsMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
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
}));

export default usePersonDataStyles;
