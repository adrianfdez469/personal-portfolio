import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, makeStyles, useMediaQuery } from '@material-ui/core';
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
  borderMedium: {
    width: theme.spacing(13.75),
    height: theme.spacing(13.75),
  },
  borderSmall: {
    width: theme.spacing(9.5),
    height: theme.spacing(9.5),
  },

  avatarLong: {
    width: theme.spacing(19.25),
    height: theme.spacing(19.25),
  },
  avatarMedium: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  avatarSmall: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const AvatarPhoto = (props) => {
  const { src, size } = props;
  const styles = useStyle();
  const upSmSize = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const upMdSize = useMediaQuery((theme) => theme.breakpoints.up('md'));

  let realSize = size;
  if (realSize === 'adjustable') {
    if (upMdSize) {
      realSize = 'long';
    } else if (upSmSize) {
      realSize = 'default';
    } else {
      realSize = 'small';
    }
  }

  let borderStyle;
  let avatarStyle;
  switch (realSize) {
    case 'small':
      borderStyle = styles.borderSmall;
      avatarStyle = styles.avatarSmall;
      break;
    case 'long':
      borderStyle = styles.borderLong;
      avatarStyle = styles.avatarLong;
      break;
    default:
      borderStyle = styles.borderMedium;
      avatarStyle = styles.avatarMedium;
  }

  return (
    <div className={clsx(styles.border, borderStyle)}>
      <Avatar className={avatarStyle} src={src} variant="circular" />
    </div>
  );
};

AvatarPhoto.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'long', 'adjustable']),
};
AvatarPhoto.defaultProps = {
  src: null,
  size: 'small',
};

export default AvatarPhoto;
