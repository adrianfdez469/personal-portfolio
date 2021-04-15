/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: '50%',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

const ImageLoader = ({ src }) => src;

const OptimizedAvatar = (props) => {
  const { src, width, height, quality, className, children, ...otherProps } = props;
  const styles = useStyles();

  const cmp = src
    ? () => (
        <Image
          className={styles.image}
          loader={ImageLoader}
          src={src}
          width={width}
          height={height}
          quality={quality}
          alt="avatar"
          layout="fixed"
        />
      )
    : 'div';

  return (
    <Avatar component={cmp} variant="circular" className={styles.avatar} {...otherProps}>
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
