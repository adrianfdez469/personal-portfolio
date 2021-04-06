// Ext libs
import React /* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
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

const years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const PersonalDataForm = ({ data, edit }) => {
  // constants
  const { lang, locale } = useLang();

  return (
    <StepItem label={lang.personalDataStep.header.label}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocales[locale]}>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label={lang.personalDataStep.form.inputName.label}
              placeholder={lang.personalDataStep.form.inputName.placeholder}
              required
              margin="dense"
              value={data.name}
              onChange={(event) => edit('name', event.target.value)}
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label={lang.personalDataStep.form.title.label}
              placeholder={lang.personalDataStep.form.title.placeholder}
              required
              margin="dense"
              value={data.title}
              onChange={(event) => edit('title', event.target.value)}
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
              value={data.description}
              onChange={(event) => edit('description', event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              value={data.birthday}
              onChange={(date) => edit('birthday', new Date(date).getTime())}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              fullWidth
              invalidDateMessage={lang.personalDataStep.form.birthday.invalidDate}
              invalidLabel={lang.personalDataStep.form.birthday.invalidDate}
              maxDateMessage={lang.personalDataStep.form.birthday.maxDateMessage}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel id="select-years">
                {lang.personalDataStep.form.experience.label}
              </InputLabel>
              <Select
                labelId="select-years"
                id="expSelectId"
                variant="outlined"
                label={lang.personalDataStep.form.experience.label}
                value={data.experience}
                onChange={(event) => edit('experience', event.target.value)}
              >
                {years.map((n) => (
                  <MenuItem key={n} value={n}>
                    {`${n} ${lang.personalDataStep.form.experience[n === 1 ? 'year' : 'years']}`}
                  </MenuItem>
                ))}
                <MenuItem value={years.length}>
                  {`${years.length}+ ${lang.personalDataStep.form.experience.years}`}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel id="select-gender">{lang.personalDataStep.form.gender.label}</InputLabel>
              <Select
                labelId="select-gender"
                id="genderSelectId"
                variant="outlined"
                label={lang.personalDataStep.form.gender.label}
                value={data.gender}
                onChange={(event) => edit('gender', event.target.value)}
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
PersonalDataForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    birthday: PropTypes.number,
    gender: PropTypes.string,
    experience: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string,
  }).isRequired,
  edit: PropTypes.func.isRequired,
};

export default React.memo(PersonalDataForm);
