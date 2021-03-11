import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles((theme) => ({
  borderLong: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      ' 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
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
  const styles = useStyle();

  const borderStyle = size === 'small' ? styles.borderSmall : styles.borderLong;
  const avatarStyle = size === 'small' ? styles.avatarSmall : styles.avatarLong;
  const marginStyle = size === 'small' ? styles.marginSmall : styles.marginLong;

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div className={borderStyle} />
      <Avatar className={clsx(avatarStyle, marginStyle)} src={src} variant="circular" />
    </div>
  );
};

AvatarPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'long']).isRequired,
};

export default AvatarPhoto;
