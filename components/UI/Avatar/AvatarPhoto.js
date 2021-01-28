import React, { useState, useEffect } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';

import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  borderLong: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  avatarLong: {
    width: '154px',
    height: '154px',
  },
  borderSmall: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  avatarSmall: {
    width: '56px',
    height: '56px',
  },
  marginSmall: {
    margin: '-3.6rem 0.5rem 0.0rem 0.18rem',
  },
  marginLong: {
    margin: '-9.8rem 0.5rem 0.0rem 0.19rem',
  },
}));

const AvatarPhoto = (props) => {
  const { src, size } = props;
  const classes = useStyle();

  const [border, setBorder] = useState('long');
  const [avatar, setAvatar] = useState('long');
  const [margin, setMargin] = useState('long');

  useEffect(() => {
    if (size === 'small') {
      setBorder(classes.borderSmall);
      setAvatar(classes.avatarSmall);
      setMargin(classes.marginSmall);
    } else {
      setBorder(classes.borderLong);
      setAvatar(classes.avatarLong);
      setMargin(classes.marginLong);
    }
  });

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div className={border} />
      <Avatar className={clsx(avatar, margin)} src={src} variant="circular" />
    </div>
  );
};

export default AvatarPhoto;
