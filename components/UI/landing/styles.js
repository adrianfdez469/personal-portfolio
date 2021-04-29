import makeStyles from '@material-ui/core/styles/makeStyles';

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
  paper: {
    background: 'rgba(205, 205, 205, 0.6)',
    borderRadius: 20,
    color: 'white',
    textShadow: '1px 1px #000000',
    zIndex: 2,
    margin: 'auto',
  },
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
  featuresBack: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '60em',
    clipPath: 'polygon(0 5%, 100% 1%, 100% 95%, 0% 99%)',
    paddingTop: '70px',
    paddingBottom: '70px',
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
    backgroundColor: theme.palette.secondary.main,
  },
  featureCardText: {
    marginTop: '1em',
  },
  featuresCardHover: {
    // '&:hover': {
    //   transform: 'scale(1.02) translate(0px, -8px)',
    //   transition: 'all 300ms ease-in-out 0s',
    // },
  },
  aboutStyle: {
    height: 'auto',
    marginBottom: '3em',
  },
  headerText: {
    // '-webkit-text-stroke-width': '0.01em',
    // '-webkit-text-stroke-color': theme.palette.primary.main,
    fontWeight: 'bold',
    // color: 'rgba(205, 205, 205, 0)',
    color: theme.palette.primary.main,
  },
  footerStyle: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: '3em',
    minHeight: '27em',
    clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    overflow: 'hidden',
    maxHeight: 250,
  },
}));
