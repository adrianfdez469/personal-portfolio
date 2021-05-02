import { lightBlue, red, yellow, green } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  rootCSB: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
  },
  cardCSB: {
    maxWidth: '35em',
    marginRight: '0.7em',
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
    minWidth: '6em',
    alignSelf: 'flex-end',
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
  lightsuccess: { backgroundColor: green[200], color: 'black' },
  success: { backgroundColor: green[700], color: 'white' },
  lighterror: { backgroundColor: red[100], color: 'black' },
  error: { backgroundColor: red[700], color: 'white' },
  lightwarning: { backgroundColor: yellow[300], color: 'black' },
  warning: { backgroundColor: yellow[800], color: 'black' },
  lightinfo: { backgroundColor: lightBlue[200], color: 'black' },
  info: { backgroundColor: lightBlue[700], color: 'white' },
  lightdefault: { backgroundColor: 'white', color: 'black' },
  default: { backgroundColor: 'black', color: 'white' },
  textOverflow: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
  textOverflowExpanded: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
  yesBtn: {
    marginRight: theme.spacing(0.5),
  },
  noBtn: {
    marginLeft: theme.spacing(0.5),
  },
}));
