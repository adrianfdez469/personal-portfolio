// Ext libs
import React from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Box, Typography } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const SYNC = 'SYNC';

export const SyncForm = (props) => {
  const { stepId } = props;
  const classes = useStepsStyles();
  return (
    <Box className={classes.mainContent} hidden={stepId !== SYNC}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" style={{ display: 'block' }}>
          Si tienes tu proyecto en GitHub o GitLab sincronizalo y muestranos lo que haz logrado!
        </Typography>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <GitHubIcon fontSize="large" style={{ margin: 'auto' }} />
      </Box>
    </Box>
  );
};

SyncForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const syncObj = new ProjectStep(SYNC, 'Sincroniza tu proyecto');
