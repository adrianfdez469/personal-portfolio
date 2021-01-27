// Ext libs
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const COLLABORATORS = 'COLLABORATORS';

export const CollaboratorsForm = (props) => {
  const { stepId } = props;
  const classes = useStepsStyles();
  return (
    <Box className={classes.mainContent} hidden={stepId !== COLLABORATORS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" style={{ display: 'block' }}>
          Tabajaste solo? Quiénes colaboraron contigo?
        </Typography>
      </Box>
    </Box>
  );
};

CollaboratorsForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const collaboratorsObj = new ProjectStep(COLLABORATORS, 'Colaboradores');
