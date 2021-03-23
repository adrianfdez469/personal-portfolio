import { makeStyles } from '@material-ui/core';

const useCollaboratorsStyles = makeStyles((theme) => ({
  smallAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  accordionDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default useCollaboratorsStyles;
