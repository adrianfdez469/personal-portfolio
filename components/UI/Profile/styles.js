import { makeStyles } from '@material-ui/core';

export const usePersonDataStyles = makeStyles((theme) => ({
  box: {
    margin: 'auto',
    width: '100vh',
  },
  paper: {
    maxWidth: '95.0rem',
    width: '100%',
    height: '20.5rem',
    margin: 'auto',
  },
  headerTop: {
    width: '100%',
    height: '7.5rem',
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
  },
  headerBotton: {
    width: '100%',
    height: 'min-content',
    maxHeight: '8.0rem',
    marginTop: '-1.5rem',
  },
  headerButton: {
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
  },
  avatar: {
    width: '9.0rem',
    height: '9.0rem',
    margin: '0.0rem 1.5rem 0.0rem 1.5rem',
    borderColor: '#fd9f41',
  },
  avatarBorder: {
    borderRadius: '50%',
    backgroundColor: '#fff',
    width: '10.0rem',
    height: '10.0rem',
    marginLeft: 'auto',
  },
  name: {
    margin: '0.0rem 0.0rem 0.0rem 0.5rem',
    color: theme.palette.background.paper,
  },
  subtitle: {
    margin: '0.0rem 0.0rem 0.0rem 1.0rem',
    color: theme.palette.background.paper,
  },
  role: {
    marginLeft: '10.0rem',
  },
  typography: {
    minWidth: 100,
  },
  skills: {
    margin: '1.5rem',
  },
  buttonBar: {
    color: theme.palette.background.paper,
  },
  containerName: {
    maxWidth: '90%',
    height: '6.0rem',
    margin: '1.5rem 0.0rem 0.0rem 0.0rem',
  },
  containerDataLeft: {
    margin: '1.0rem 0.0rem 0.0rem 1.0rem',
    textAlign: 'justify',
  },
  containerDataRight: {
    margin: '1.0rem 0.0rem 0.0rem 0.0rem',
    textAlign: 'justify',
    width: '95%',
  },
  divider: {
    height: '7.0rem',
    width: '1.0',
    margin: '0.7rem 0.0rem 0.0rem 2.0rem ',
  },
}));

export const useProjectBoxStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '22.54rem',
    width: '100%',
    flexWrap: 'wrap',
    overflow: 'hidden',
    margin: '1.0rem 1.0rem 1.0rem 0.2rem',
  },
  box: {
    margin: 'auto',
    display: 'flex',
    width: '100%',
    maxWidth: '95.0rem',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  media: {
    paddingTop: '40%',
    width: '90%',
    margin: 'auto',
    objectFit: 'cover',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  mediaNew: {
    paddingTop: '80%',
  },
  description: {
    textAlign: 'justify',
  },
  listBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));
