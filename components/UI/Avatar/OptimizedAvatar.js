/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import { providerImageLoader } from '../../../libs/helpers';

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: '50%',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const OptimizedAvatar = (props) => {
  const { src, width, height, quality, className, children, loading, ...otherProps } = props;
  const styles = useStyles();

  const cmp = src
    ? () => (
        <Image
          className={styles.image}
          loader={providerImageLoader}
          src={src}
          width={width}
          height={height}
          quality={quality}
          alt="avatar"
          layout="fixed"
          loading={loading}
        />
      )
    : 'div';

  return (
    <Avatar
      component={cmp}
      variant="circular"
      className={styles.avatar}
      style={{ width, height }}
      {...otherProps}
    >
      {children}
    </Avatar>
  );
};

OptimizedAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  quality: PropTypes.number,
  loading: PropTypes.oneOf(['lazy', 'eager']),
};
OptimizedAvatar.defaultProps = {
  width: 40,
  height: 40,
  quality: 75,
  loading: 'lazy',
};

export default React.memo(OptimizedAvatar);
