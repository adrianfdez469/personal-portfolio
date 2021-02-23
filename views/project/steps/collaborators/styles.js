import { makeStyles } from '@material-ui/core';

const useCollaboratorsStyles = makeStyles((theme) => ({
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  accordionDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default useCollaboratorsStyles;
