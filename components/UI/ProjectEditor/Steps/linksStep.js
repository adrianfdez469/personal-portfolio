// Ext libs
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const LINKS = 'LINKS';

export const LinksForm = (props) => {
  const { stepId } = props;
  const classes = useStepsStyles();
  return (
    <Box className={classes.mainContent} hidden={stepId !== LINKS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" style={{ display: 'block' }}>
          Puedes mostrar tu trabajo en línea? Compártelo para que otros lo vean.
        </Typography>
      </Box>
    </Box>
  );
};

LinksForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const linksObj = new ProjectStep(LINKS, 'Enlaces externos');
