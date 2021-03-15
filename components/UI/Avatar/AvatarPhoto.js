import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Avatar, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

const Editable = dynamic(() => import('./EditAvatarPhoto'));

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
  const { src, size, edit } = props;
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
      {
        borderStyle = styles.borderSmall;
        avatarStyle = styles.avatarSmall;
      }
      break;
    case 'long':
      {
        borderStyle = styles.borderLong;
        avatarStyle = styles.avatarLong;
      }
      break;
    default:
      borderStyle = styles.borderMedium;
      avatarStyle = styles.avatarMedium;
  }

  const AvatarCmp = edit ? (
    <Editable size={realSize} onClick={() => {}}>
      <Avatar className={avatarStyle} src={src} variant="circular" />
    </Editable>
  ) : (
    <Avatar className={avatarStyle} src={src} variant="circular" />
  );

  return <div className={clsx(styles.border, borderStyle)}>{AvatarCmp}</div>;
};

AvatarPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'long', 'adjustable']).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default AvatarPhoto;
