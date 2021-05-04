import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  mainBox: {
    marginTop: theme.spacing(4),
  },
  bordered: {
    borderWidth: '1px',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderColor: theme.palette.text.secondary,
  },
  delete: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(15),
  },
  text: {
    lineHeight: theme.spacing(1 / 4),
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
    },
  },
  spaceBetWeen: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
  },
  spaceEvenly: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
  butotonMargin: {
    margin: theme.spacing(0, 0, 0, 0),
    padding: theme.spacing(0.2),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
  flexSpaced: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
