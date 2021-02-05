import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  back: {
    backgroundImage: "url('/images/1.jpg')",
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
  },
  '@global': {
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      'background-color': theme.palette.divider,
      'border-radius': '10px',
    },

    '*::-webkit-scrollbar': {
      width: '10px',
      'background-color': theme.palette.divider,
    },

    '*::-webkit-scrollbar-thumb': {
      'background-color': theme.palette.primary.main,
      'background-image': `-webkit-linear-gradient(45deg,
        rgba(255, 255, 255, .2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .2) 50%,
        rgba(255, 255, 255, .2) 75%,
        transparent 75%,
        transparent)`,
    },
  },
}));
