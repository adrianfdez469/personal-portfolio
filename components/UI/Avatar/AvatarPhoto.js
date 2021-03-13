import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Avatar, makeStyles } from '@material-ui/core';
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

const AvatarPhoto = (props) => {
  const { src, size, edit } = props;
  const styles = useStyle();

  const borderStyle = size === 'small' ? styles.borderSmall : styles.borderLong;
  const avatarStyle = size === 'small' ? styles.avatarSmall : styles.avatarLong;

  const [AvatarCmp, setAvatarCmp] = useState(
    <Avatar className={avatarStyle} src={src} variant="circular" />
  );

  useEffect(() => {
    if (edit) {
      const Editable = dynamic(() => import('./EditAvatarPhoto'));
      setAvatarCmp(
        <Editable size={size} onClick={() => {}}>
          {AvatarCmp}
        </Editable>
      );
    }
  }, []);

  return <div className={clsx(styles.border, borderStyle)}>{AvatarCmp}</div>;
};

AvatarPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'long']).isRequired,
  edit: PropTypes.bool.isRequired,
};

export default AvatarPhoto;
