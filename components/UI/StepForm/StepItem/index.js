import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import useStepsStyles from './styles';

const StepItem = (props) => {
  const { label, children } = props;
  const stepStyles = useStepsStyles();

  return (
    <Box className={stepStyles.mainContent}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

StepItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.any, PropTypes.string]).isRequired,
  children: PropTypes.element.isRequired,
};

export default StepItem;
