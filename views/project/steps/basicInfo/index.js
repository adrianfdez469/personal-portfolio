// Ext libs
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Typography, Grid, TextField, useMediaQuery } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// Components
import ProjectStep from '../ProjectStep';
// Styles
import { useStepsStyles } from '../../styles';

export const BASIC_INFO_STEP = 'BASIC_INFO_STEP';

export const BasicInfoForm = (props) => {
  // constants
  const { stepId, data } = props;
  // hooks
  const classes = useStepsStyles();
  const [name, setName] = useState('');
  const [initialDate, setInitialDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));

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

  // effects
  useEffect(() => {
    if (data) {
      if (data.name) setName(data.name);
      if (data.initialDate) setInitialDate(data.initialDate);
      if (data.description) setDescription(data.description);
    }
  }, [data]);

  return (
    <Box className={classes.mainContent} hidden={stepId !== BASIC_INFO_STEP}>
      <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
        Completa la información sobre el proyecto
      </Typography>
      <Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between" alignItems="flex-end">
            <TextField
              label="Nombre"
              helperText="Nombre del proyecto"
              required
              margin="dense"
              onChange={handleNameChange}
              value={name}
              variant="outlined"
              fullWidth={!greaterMdSize}
            />
            <KeyboardDatePicker
              clearable
              margin="dense"
              label="Fecha inicio"
              helperText="Fecha de comienzo del proyecto"
              format="dd/MM/yyyy"
              inputVariant="outlined"
              value={initialDate}
              onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              fullWidth={!greaterMdSize}
            />
            <KeyboardDatePicker
              clearable
              margin="dense"
              label="Fecha fin"
              helperText="Fecha de finalización del proyecto"
              format="dd/MM/yyyy"
              inputVariant="outlined"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
              fullWidth={!greaterMdSize}
            />
          </Grid>
          <TextField
            label="Descripción"
            helperText="Breve descripción sobre el proyecto"
            multiline
            rows="5"
            required
            margin="dense"
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
};

BasicInfoForm.propTypes = {
  stepId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    initialDate: PropTypes.number,
  }),
};
BasicInfoForm.defaultProps = {
  data: {
    name: '',
    description: '',
    initialDate: null,
  },
};

export const basicInfoObj = new ProjectStep(BASIC_INFO_STEP, 'Información');
