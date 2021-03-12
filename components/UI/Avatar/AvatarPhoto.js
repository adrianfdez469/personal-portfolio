import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, Badge, makeStyles } from '@material-ui/core';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  border: {
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 8px ${theme.palette.text.primary}`,
  },
  borderLong: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarLong: {
    width: theme.spacing(19.25),
    height: theme.spacing(19.25),
  },
  borderSmall: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
  },
  avatarSmall: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const useSmallPhotoCameraButtonStyle = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 0 5px ${theme.palette.action.disabled}`,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
const SmallPhotoCameraButton = ({ onClick, size }) => {
  const styles = useSmallPhotoCameraButtonStyle();
  return (
    <IconButton id="cameraIconButton" size="small" className={styles.iconButton} onClick={onClick}>
      <PhotoCameraOutlinedIcon fontSize={size === 'small' ? size : 'default'} />
    </IconButton>
  );
};

SmallPhotoCameraButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

const AvatarPhoto = (props) => {
  const { src, size, edit } = props;
  const styles = useStyle();

  const borderStyle = size === 'small' ? styles.borderSmall : styles.borderLong;
  const avatarStyle = size === 'small' ? styles.avatarSmall : styles.avatarLong;

  const content = edit ? (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={<SmallPhotoCameraButton onClick={() => {}} size={size} />}
    >
      <Avatar className={avatarStyle} src={src} variant="circular" />
    </Badge>
  ) : (
    <Avatar className={avatarStyle} src={src} variant="circular" />
  );

  return <div className={clsx(styles.border, borderStyle)}>{content}</div>;
};

AvatarPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'long']).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default AvatarPhoto;
