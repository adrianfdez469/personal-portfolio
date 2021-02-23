// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField } from '@material-ui/core';
// Components
import ProjectStep from '../ProjectStep';
// Styles
import { useStepsStyles } from '../../styles';

export const MORE = 'MORE';

export const MoreForm = (props) => {
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
    <Box className={classes.mainContent} hidden={stepId !== MORE}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
          Hay alguna otra información que desees compartir? Hazlo aquí!
        </Typography>
      </Box>
      <Box>
        <TextField
          label=""
          fullWidth
          variant="outlined"
          rows="5"
          multiline
          required
          margin="dense"
          helperText="Comparte tus experiencias u otra información que desees"
          value={otherText}
          onChange={changeOtherHandlers}
        />
      </Box>
    </Box>
  );
};

MoreForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const moreObj = new ProjectStep(MORE, 'Más');
