// Ext libs
import React /* , { useState, useEffect } */ from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// Languages (dates)
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-US';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';

const dateLocales = {
  en: enLocale,
  es: esLocale,
};

const PersonalDataForm = () => {
  // constants
  const { lang, locale } = useLang();

  /* const handleChange = (field, value) => {
    console.log('Changing data');
  }; */

  return (
    <StepItem label={lang.personalDataStep.header.label}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocales[locale]}>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={lang.personalDataStep.form.inputName.label}
              placeholder={lang.personalDataStep.form.inputName.placeholder}
              required
              margin="dense"
              // onChange={(event) => handleChange('name', event.target.value)}
              // value={data.name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={lang.personalDataStep.form.title.label}
              placeholder={lang.personalDataStep.form.title.placeholder}
              required
              margin="dense"
              // onChange={(event) => handleChange('name', event.target.value)}
              // value={data.name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label={lang.personalDataStep.form.description.label}
              placeholder={lang.personalDataStep.form.description.placeholder}
              multiline
              rows="5"
              margin="dense"
              // value={data.description}
              // onChange={handleDescriptionChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              clearable
              clearLabel={lang.personalDataStep.form.birthday.clearLabel}
              cancelLabel={lang.personalDataStep.form.birthday.cancelLabel}
              okLabel={lang.personalDataStep.form.birthday.okLabel}
              label={lang.personalDataStep.form.birthday.label}
              margin="dense"
              autoOk
              disableFuture
              maxDate={new Date()}
              format={lang.personalDataStep.form.birthday.formatDate}
              inputVariant="outlined"
              // value={data.initialDate}
              // onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              fullWidth
              invalidDateMessage={lang.personalDataStep.form.birthday.invalidDate}
              invalidLabel={lang.personalDataStep.form.birthday.invalidDate}
              maxDateMessage={lang.personalDataStep.form.birthday.maxDateMessage}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel id="select-gender">{lang.personalDataStep.form.gender.label}</InputLabel>
              <Select
                labelId="select-gender"
                id="demo-simple-select"
                variant="outlined"
                label={lang.personalDataStep.form.gender.label}
              >
                <MenuItem value={null}>{lang.personalDataStep.form.gender.none}</MenuItem>
                <MenuItem value="male">{lang.personalDataStep.form.gender.male}</MenuItem>
                <MenuItem value="female">{lang.personalDataStep.form.gender.female}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </StepItem>
  );
};

export default React.memo(PersonalDataForm);
