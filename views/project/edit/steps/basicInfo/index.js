// Ext libs
import PropTypes from 'prop-types';
import React /* , { useState, useEffect } */ from 'react';
import { Grid, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// Languages (dates)
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-US';
// Components
import LinkPreview from '../../../../../components/UI/LinkPreview';
import StepItem from '../../../../../components/UI/StepForm/StepItem';
// Libs
import { isStringEmpty } from '../../../../../libs/helpers';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';

const dateLocales = {
  en: enLocale,
  es: esLocale,
};

const BasicInfoForm = (props) => {
  // constants
  const { data, changeData } = props;

  const { lang, locale } = useLang();

  // handlers
  const handleChange = (field, value) => {
    changeData({ [field]: value });
  };
  const handleSetProjectLink = (text) => {
    changeData({
      proyectLink: {
        url: text,
        imageUrl: '',
        title: '',
        description: '',
      },
    });
  };
  const handleSetProjectPreview = (previewData) => {
    changeData({ proyectLink: previewData });
  };
  const handleSetProjectDevLink = (text) => {
    changeData({
      devLink: {
        url: text,
        imageUrl: '',
        title: '',
        description: '',
      },
    });
  };
  const handleSetProjectDevPreview = (previewData) => {
    changeData({ devLink: previewData });
  };
  return (
    <StepItem label={lang.infoStep.header.label}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLocales[locale]}>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={lang.infoStep.form.inputName.label}
              placeholder={lang.infoStep.form.inputName.placeholder}
              required
              margin="dense"
              onChange={(event) => handleChange('name', event.target.value)}
              value={data.name}
              variant="outlined"
              fullWidth
              error={isStringEmpty(data.name)}
              helperText={isStringEmpty(data.name) ? lang.infoStep.form.empty : ''}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <KeyboardDatePicker
              clearable
              clearLabel={lang.infoStep.form.inputDate.clearLabel}
              cancelLabel={lang.infoStep.form.inputDate.cancelLabel}
              okLabel={lang.infoStep.form.inputDate.okLabel}
              label={lang.infoStep.form.inputIniDate.label}
              margin="dense"
              autoOk
              disableFuture
              // maxDate={endDate}
              format={lang.infoStep.form.inputDate.formatDate}
              inputVariant="outlined"
              value={data.initialDate}
              onChange={(date) => handleChange('initialDate', new Date(date).getTime())}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              fullWidth
              invalidDateMessage={lang.infoStep.form.inputDate.invalidDate}
              invalidLabel={lang.infoStep.form.inputDate.invalidDate}
              maxDateMessage={lang.infoStep.form.inputDate.maxDateMessage}
              error={isStringEmpty(data.initialDate)}
              helperText={isStringEmpty(data.initialDate) ? lang.infoStep.form.empty : ''}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <KeyboardDatePicker
              clearable
              margin="dense"
              clearLabel={lang.infoStep.form.inputDate.clearLabel}
              cancelLabel={lang.infoStep.form.inputDate.cancelLabel}
              okLabel={lang.infoStep.form.inputDate.okLabel}
              label={lang.infoStep.form.inputEndDate.label}
              autoOk
              disableFuture
              format={lang.infoStep.form.inputDate.formatDate}
              inputVariant="outlined"
              value={data.endDate}
              onChange={(date) => handleChange('endDate', new Date(date).getTime())}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
              // fullWidth={!greaterMdSize}
              minDate={data.initialDate}
              fullWidth
              invalidDateMessage={lang.infoStep.form.inputDate.invalidDate}
              invalidLabel={lang.infoStep.form.inputDate.invalidDate}
              minDateMessage={lang.infoStep.form.inputDate.minDateMessage}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label={lang.infoStep.form.inputDescription.label}
              placeholder={lang.infoStep.form.inputDescription.placeholder}
              multiline
              rows="5"
              margin="dense"
              value={data.description}
              onChange={(event) => handleChange('description', event.target.value)}
              variant="outlined"
              fullWidth
              error={isStringEmpty(data.description)}
              helperText={isStringEmpty(data.description) ? lang.infoStep.form.empty : ''}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              rows="5"
              multiline
              margin="dense"
              label={lang.infoStep.form.inputMore.label}
              placeholder={lang.infoStep.form.inputMore.placeholder}
              value={data.otherText}
              onChange={(event) => handleChange('otherText', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LinkPreview
              fullWidth
              label={lang.infoStep.form.inputProjectLink.label}
              setLink={handleSetProjectLink}
              url={data.proyectLink.url}
              placeholder={lang.infoStep.form.inputProjectLink.placeholder}
              setPreview={handleSetProjectPreview}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LinkPreview
              fullWidth
              label={lang.infoStep.form.inputProjectDevLink.label}
              setLink={handleSetProjectDevLink}
              url={data.devLink.url}
              placeholder={lang.infoStep.form.inputProjectDevLink.placeholder}
              setPreview={handleSetProjectDevPreview}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </StepItem>
  );
};

BasicInfoForm.propTypes = {
  changeData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    initialDate: PropTypes.oneOfType([PropTypes.number, PropTypes.shape(PropTypes.any)]),
    endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.shape(PropTypes.any)]),
    otherText: PropTypes.string.isRequired,
    proyectLink: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    devLink: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default React.memo(BasicInfoForm);
