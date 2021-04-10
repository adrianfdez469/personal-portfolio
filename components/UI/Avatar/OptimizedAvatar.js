/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  avatar: {
    borderRadius: '50%',
  },
});

const ImageLoader = ({ src }) => src;

const OptimizedAvatar = (props) => {
  const { src, width, height, quality, className, children, ...otherProps } = props;
  const styles = useStyles();
  return (
    <Avatar
      component={() => (
        <Image
          className={styles.avatar}
          loader={ImageLoader}
          src={src}
          width={width}
          height={height}
          quality={quality}
          alt="avatar"
          layout="fixed"
        />
      )}
      variant="circular"
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
};
OptimizedAvatar.defaultProps = {
  width: 40,
  height: 40,
  quality: 75,
};

export default React.memo(OptimizedAvatar);
