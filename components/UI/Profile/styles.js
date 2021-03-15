import { makeStyles } from '@material-ui/core';

export const usePersonDataStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'flex-start',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  north: {
    height: 'auto',
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      height: theme.spacing(15),
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
      fontSize: theme.spacing(6),
    },
  },
  headerSecondary: {
    color: theme.palette.background.paper,
    fontSize: theme.spacing(1.6),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(4),
    },
  },
  text: {
    fontSize: theme.spacing(1.6),
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(2),
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
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const useProjectBoxStyles = makeStyles((theme) => ({
  grid: {
    margin: 0,
    width: 'auto',
  },
  card: {
    width: theme.spacing(38),
    // height: '100%',
    height: theme.spacing(50),
    display: 'inline-grid',
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
  media: {
    paddingTop: '40%',
    width: '90%',
    margin: 'auto',
    objectFit: 'cover',
  },
  description: {
    textAlign: 'justify',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
  },
  mediaNew: {
    paddingTop: '80%',
  },
}));
