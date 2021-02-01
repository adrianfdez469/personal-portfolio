// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const OTHERS = 'OTHERS';

export const OthersForm = (props) => {
  // constants
  const { stepId } = props;
  // hooks
  const [otherText, setOtherText] = useState();
  // handlers
  const changeOtherHandlers = (event) => {
    setOtherText(event.target.value);
  };

  const classes = useStepsStyles();
  return (
    <Box className={classes.mainContent} hidden={stepId !== OTHERS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
          Hay alguna otra información que desees compartir? Hazlo aquí!
        </Typography>
      </Box>
      <Box>
        <TextField
          label="Descripción del proyecto"
          fullWidth
          variant="outlined"
          rows="5"
          multiline
          required
          margin="dense"
          value={otherText}
          onChange={changeOtherHandlers}
        />
      </Box>
    </Box>
  );
};

OthersForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const othersObj = new ProjectStep(OTHERS, 'Otros');
