// Ext libs
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Typography, Grid, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const BASIC_INFO_STEP = 'BASIC_INFO_STEP';

export const BasicInfoForm = (props) => {
  // constants
  const { stepId, prevName, prevInitialDate, prevEndDate, prevDescription } = props;
  // hooks
  const classes = useStepsStyles();
  const [name, setName] = useState(prevName || '');
  const [initialDate, setInitialDate] = useState(prevInitialDate || null);
  const [endDate, setEndDate] = useState(prevEndDate || null);
  const [description, setDescription] = useState(prevDescription || '');

  // handlers
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleInitialDateChange = (date) => {
    setInitialDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Box className={classes.mainContent} hidden={stepId !== BASIC_INFO_STEP}>
      <Typography align="center" variant="overline" style={{ display: 'block' }}>
        Completa la información sobre el proyecto
      </Typography>
      <Box>
        {
          // TODO: MuiPickersUtilsProvider should as a wrapper of all DatePicker from @material/picker
        }
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between" alignItems="flex-end">
            <TextField
              label="Nombre"
              helperText="Escriba el nombre del proyecto"
              required
              margin="dense"
              onChange={handleNameChange}
              value={name}
            />
            <KeyboardDatePicker
              clearable
              margin="dense"
              label="Fecha inicio"
              helperText="Fecha de comienzo del proyecto"
              format="dd/MM/yyyy"
              value={initialDate}
              onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
            />
            <KeyboardDatePicker
              clearable
              margin="dense"
              label="Fecha fin"
              helperText="Fecha de finalización del proyecto"
              format="dd/MM/yyyy"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
            />
          </Grid>
          <TextField
            label="Descripción"
            helperText="Escriba una breve descripción sobre el proyecto"
            fullWidth
            multiline
            required
            margin="dense"
            value={description}
            onChange={handleDescriptionChange}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
};

BasicInfoForm.propTypes = {
  stepId: PropTypes.string.isRequired,
  prevName: PropTypes.string,
  prevInitialDate: PropTypes.instanceOf(Date),
  prevEndDate: PropTypes.instanceOf(Date),
  prevDescription: PropTypes.string,
};

BasicInfoForm.defaultProps = {
  prevName: null,
  prevInitialDate: null,
  prevEndDate: null,
  prevDescription: null,
};

export const basicInfoObj = new ProjectStep(BASIC_INFO_STEP, 'Información');
