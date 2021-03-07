import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const CustomBackdrop = ({ open }) => {
  const styles = useStyles();
  return (
    <Backdrop className={styles.backdrop} open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

CustomBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default CustomBackdrop;
