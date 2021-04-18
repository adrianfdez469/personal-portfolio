import { makeStyles } from '@material-ui/core';

const useSkillsStyles = makeStyles((theme) => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down(800)]: {
      flexDirection: 'column',
    },
  },
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default useSkillsStyles;
