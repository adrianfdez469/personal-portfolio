import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  globalButtons: {
    color: theme.palette.type === 'dark' ? 'white' : 'black',
  },
  // heading: {
  //   fontWeight: 'bold',
  // },
  /* paper: {
    background: 'rgba(205, 205, 205, 0.6)',
    borderRadius: 20,
    color: 'white',
    textShadow: '1px 1px #000000',
    zIndex: 2,
    margin: 'auto',
  }, */
  second: {
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
  first: {
    margin: theme.spacing(1.5),
  },
  featuresBack: {
    // backgroundColor: fade(theme.palette.background.paper, 0.9),
    background: `linear-gradient(0deg, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
      theme.palette.background.paper,
      0.9
    )} 5%,  ${fade(theme.palette.background.paper, 0.9)} 95%, ${fade(
      theme.palette.background.paper,
      0
    )} 100%)`,
    minHeight: '60em',
    // clipPath: 'polygon(0 5%, 100% 1%, 100% 95%, 0% 99%)',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    boxShadow: '0px 0px 0px transparent',
  },
  featuresImg: {
    display: 'flex',
    margin: 'auto',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  featureContainer: {
    display: 'flex',
    margin: 'auto',
    marginTop: '2em',
    marginBottom: '2em',
  },
  featureCardRoot: {
    display: 'flex',
    margin: 'auto',
    maxWidth: '28em',
    marginTop: '2em',
    marginBottom: '2em',
  },
  featureCardMedia: {
    height: '15em',
  },
  featureCardDivider: {
    backgroundColor: theme.palette.primary.main,
  },
  featureCardText: {
    marginTop: '1em',
    fontSize: '1.5em',
    fontWeight: '100',
  },
  aboutStyle: {
    height: 'auto',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  headerText: {
    // '-webkit-text-stroke-width': '0.01em',
    // '-webkit-text-stroke-color': theme.palette.primary.main,
    fontWeight: 'bold',
    // color: 'rgba(205, 205, 205, 0)',
    color: theme.palette.primary.main,
  },
  footerStyle: {
    // backgroundColor: theme.palette.background.paper,
    background: `linear-gradient(180deg, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
      theme.palette.background.paper,
      0.9
    )} 5%,  ${fade(theme.palette.background.paper, 0.9)} 100%)`,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    minHeight: '27em',
    // clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    maxHeight: '60vh',
  },
}));
