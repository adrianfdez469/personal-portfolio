import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Badge, useMediaQuery } from '@material-ui/core';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

const useSmallPhotoCameraButtonStyle = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 0 8px ${theme.palette.text.secondary}`,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const EditableAvatarPhoto = ({ children, size, onClick }) => {
  const styles = useSmallPhotoCameraButtonStyle();
  const upSmSize = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  let realSize = size;
  if (realSize === 'adjustable') {
    if (upSmSize) {
      realSize = 'default';
    } else {
      realSize = 'small';
    }
  }

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={
        <IconButton
          id="cameraIconButton"
          size="small"
          className={styles.iconButton}
          onClick={onClick}
        >
          <PhotoCameraOutlinedIcon fontSize={realSize} />
        </IconButton>
      }
    >
      {children}
    </Badge>
  );
};
EditableAvatarPhoto.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EditableAvatarPhoto;
