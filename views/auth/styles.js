import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  overAllContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    padding: theme.spacing(2),
  },
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyItems: 'center',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  separator: {
    margin: theme.spacing(2),
    width: theme.spacing(34),

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(25),
    },
  },
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: theme.spacing(25),
  },
  circle: {
    border: '1px solid #bbb',
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
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(15),
    },
  },
  circleText: {
    color: '#bbb',
  },
  divider: {
    position: 'relative',
    top: theme.spacing(2.5),
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      top: theme.spacing(0),
      margin: 'auto',
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));
