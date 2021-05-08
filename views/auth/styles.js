import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';

export default makeStyles((theme) => ({
  back: {
    backgroundImage: "url('/images/1.jpg')",
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
  },
  overAllContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
  },
  card: {
    padding: theme.spacing(2),
    width: 'auto',
    background: fade(theme.palette.background.paper, 0.8),
    boxShadow: '0px 0px 0px transparent',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing(30),
  },
  separator: {
    margin: theme.spacing(2),
    width: theme.spacing(34),
  },
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: theme.spacing(25),
  },
  circle: {
    border: '1px solid #777',
    padding: theme.spacing(1.5),
    borderRadius: '50%',
    height: theme.spacing(5),
    width: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    zIndex: 99,
    margin: 'auto',
  },
  circleText: {
    color: '#777',
  },
  divider: {
    position: 'relative',
    top: theme.spacing(2.5),
    zIndex: 1,
    backgroundColor: '#777',
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: theme.spacing(27),
  },
}));
