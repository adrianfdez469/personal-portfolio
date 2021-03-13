import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Badge } from '@material-ui/core';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

const useSmallPhotoCameraButtonStyle = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 0 5px ${theme.palette.action.disabled}`,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const EditableAvatarPhoto = ({ children, size, onClick }) => {
  const styles = useSmallPhotoCameraButtonStyle();

  console.log('Entra en el avatar edit');

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
          <PhotoCameraOutlinedIcon fontSize={size === 'small' ? size : 'default'} />
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
