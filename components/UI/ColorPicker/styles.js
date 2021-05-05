import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bordered: {
    borderWidth: '1px',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderColor: theme.palette.text.secondary,
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
  colorPickerBox: {
    width: 'auto',
  },
  colorPickerColor: {
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorNormalSize: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  colorSelectedGrid: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: theme.spacing(8),
  },
  flexSpaced: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
