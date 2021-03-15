import { lightBlue, red, yellow, green } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  rootCSB: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
  },
  cardCSB: {
    // backgroundColor: '#fddc6c',
    // width: '100%',
  },
  typographyCSB: {
    fontWeight: 'bold',
  },
  actionRootCSB: {
    padding: '8px 8px 8px 16px',
    justifyContent: 'space-between',
  },
  iconsCSB: {
    marginLeft: 'auto',
  },
  expandCSB: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpenCSB: {
    transform: 'rotate(180deg)',
  },
  collapseCSB: {
    padding: 16,
  },
  checkIconCSB: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
  },
  buttonCSB: {
    padding: 0,
    textTransform: 'none',
  },
  success: { backgroundColor: green[500], color: 'white' },
  error: { backgroundColor: red[300], color: 'white' },
  warning: { backgroundColor: yellow[800], color: 'white' },
  info: { backgroundColor: lightBlue[500], maxWidth: '30em', color: 'white' },
  default: { backgroundColor: 'black', color: 'white' },

  /* rootCustSnack: {
    // minWidth: '85em',
    // maxWidth: '85em',
    maxWidth: '35em',
    color: 'white',
    borderRadius: '0.7em',
    height: '6.5em',
    marginTop: '0.2em',
    marginBottom: '0.2em',
    [theme.breakpoints.up('sm')]: {
      minWidth: '20em !important',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '19em !important',
    },
  },
  contanierSideMargins: {
    marginRight: '0.5em',
    marginLeft: '0.5em',
  },
  contanierMargins: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  closeButton: {
    alignSelf: 'center',
  },
  closeButtonColor: {
    color: 'white',
  },
  success: { backgroundColor: green[500], color: 'white' },
  error: { backgroundColor: red[300], color: 'white' },
  warning: { backgroundColor: yellow[800], color: 'white' },
  info: { backgroundColor: lightBlue[500], maxWidth: '30em', color: 'white' },
  default: { backgroundColor: 'black', color: 'white' },
  text: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  }, */
}));
