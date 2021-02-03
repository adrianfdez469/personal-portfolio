import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  cardSize: {
    maxWidth: '25em',
    minWidth: '10em',
    height: '32em',
    marginTop: '2em',
    marginLeft: '2em',
    marginRight: '2em',
    marginBottom: '2em',
    position: 'relative',
    border: `0.1em solid ${theme.palette.primary.light}`,
    borderRadius: '1em',
  },
  cardFront: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  cardFrontImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '1em',
  },
  cardFrontBar: {
    minHeight: 50,
    width: '100%',
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    bottom: '5.5em',
    transition: 'all 0.3s ease',
    zIndex: 6,
  },
  cardFrontBarDetail: {
    transform: 'translate(0, -24.5em)',
  },
  cardFrontBarContainer: {
    top: '50%',
    left: '50%',
    paddingTop: '0.7em',
    display: 'flex',
  },
  cardFrontBarText: {
    marginLeft: '0.5em',
    width: '90%',
  },
  cardFrontBarButton: {
    backgroundColor: theme.palette.background.default,
    marginRight: '0.5em',
    marginLeftt: '0.5em',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  cardBack: {
    position: 'absolute',
    top: '7em',
    zIndex: 90,
    width: '100%',
    height: '23em',
    alignSelf: 'center',
  },
  cardBackText: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 8,
    '-webkit-box-orient': 'vertical',
  },
  cardBackSocialButtonsContainer: {
    marginTop: '2em',
  },
}));
