import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  borderLong: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLong: {
    width: theme.spacing(19.25),
    height: theme.spacing(19.25),
  },
  borderSmall: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmall: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AvatarPhoto = (props) => {
  const { src, size } = props;
  const styles = useStyle();

  const borderStyle = size === 'small' ? styles.borderSmall : styles.borderLong;
  const avatarStyle = size === 'small' ? styles.avatarSmall : styles.avatarLong;

  return (
    <div className={borderStyle}>
      <Avatar className={avatarStyle} src={src} variant="circular" />
    </div>
  );
};

AvatarPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'long']).isRequired,
};

export default AvatarPhoto;
