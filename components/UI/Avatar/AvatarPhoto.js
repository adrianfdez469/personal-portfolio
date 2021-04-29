import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import OptimizedAvatar from './OptimizedAvatar';

const useStyle = makeStyles((theme) => ({
  border: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `radial-gradient(circle, transparent 62%, ${theme.palette.background.default} 63%);`,
    boxShadow: `0 0 8px ${theme.palette.background.default}`,
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
  borderXSmall: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
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
  let avatarSize;

  switch (realSize) {
    case 'xsmall':
      borderStyle = styles.borderXSmall;
      avatarSize = {
        width: 56,
        height: 56,
      };
      break;
    case 'small':
      borderStyle = styles.borderSmall;
      avatarSize = {
        width: 72,
        height: 72,
      };
      break;
    case 'long':
      borderStyle = styles.borderLong;
      avatarSize = {
        width: 154,
        height: 154,
      };
      break;
    default:
      borderStyle = styles.borderMedium;
      avatarSize = {
        width: 104,
        height: 104,
      };
  }

  return (
    <div className={clsx(styles.border, borderStyle)}>
      <OptimizedAvatar
        variant="circular"
        src={src}
        width={avatarSize.width}
        height={avatarSize.height}
      />
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
