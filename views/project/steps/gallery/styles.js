import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const useGalleryStyles = makeStyles((theme) => ({
  uploadImgContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  uploadImgWrapper: {
    position: 'relative',
  },
  uploadImgCloseButon: {
    position: 'absolute',
    right: theme.spacing(-1.5),
    top: theme.spacing(-1.5),
    color: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.5),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      color: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.8),
      backgroundColor: theme.palette.background.paper,
    },
    zIndex: 999,
  },
}));

export default useGalleryStyles;
