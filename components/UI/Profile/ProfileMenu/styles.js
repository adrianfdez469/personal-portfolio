import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardHeaderAction: {
    alignSelf: 'flex-end',
  },
  cardHeaderContent: {
    overflowX: 'hidden',
    marginRight: theme.spacing(2),
  },
  menuSelectField: {
    fontSize: '0.9em',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  listItemTextDense: {
    margin: 0,
  },
  firstDivider: {
    margin: theme.spacing(0, 2),
  },
  divider: {
    margin: theme.spacing(1, 2),
  },
}));

export default useStyles;
