import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  // paper: {
  //   background: 'rgba(205, 205, 205, 0.6)',
  //   borderRadius: 20,
  //   color: 'white',
  //   textShadow: '1px 1px #000000',
  //   zIndex: 2,
  //   margin: 'auto',
  // },
  second: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  first: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
}));
