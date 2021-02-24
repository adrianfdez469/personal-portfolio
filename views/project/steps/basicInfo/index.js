// Ext libs
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {} from 'next/router';
// Components
import LinkPreview from '../../../../components/UI/LinkPreview';
// hooks
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import { useStepsStyles } from '../../styles';

const BasicInfoForm = (props) => {
  // constants
  const { show, data } = props;
  // styles
  const stepStyles = useStepsStyles();
  // hooks
  const [name, setName] = useState('');
  const [initialDate, setInitialDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [otherText, setOtherText] = useState('');
  const [proyectLink, setProjectLink] = useState(null);
  const [devLink, setDevLink] = useState(null);
  const { lang } = useLang();

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
  const hanclerOtherChange = (event) => {
    setOtherText(event.target.value);
  };

  // effects
  useEffect(() => {
    if (data) {
      if (data.name) setName(data.name);
      if (data.initialDate) setInitialDate(data.initialDate);
      if (data.description) setDescription(data.description);
      if (data.url) setDevLink(data.url);
      if (data.deployUrl) setProjectLink(data.deployUrl);
    }
  }, [data]);

  return (
    <Box className={stepStyles.mainContent} hidden={!show}>
      <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
        {lang.infoStep.header.label}
      </Typography>
      <Box>
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label={lang.infoStep.form.inputName.label}
              placeholder={lang.infoStep.form.inputName.placeholder}
              required
              margin="dense"
              onChange={handleNameChange}
              value={name}
              variant="outlined"
              fullWidth
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
              value={initialDate}
              onChange={handleInitialDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              fullWidth
              invalidDateMessage={lang.infoStep.form.inputDate.invalidDate}
              invalidLabel={lang.infoStep.form.inputDate.invalidDate}
              maxDateMessage={lang.infoStep.form.inputDate.maxDateMessage}
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
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
              // fullWidth={!greaterMdSize}
              minDate={initialDate}
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
              value={description}
              onChange={handleDescriptionChange}
              variant="outlined"
              fullWidth
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
              value={otherText}
              onChange={hanclerOtherChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LinkPreview
              fullWidth
              label={lang.infoStep.form.inputProjectLink.label}
              setLink={setProjectLink}
              url={proyectLink}
              placeholder={lang.infoStep.form.inputProjectLink.placeholder}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LinkPreview
              fullWidth
              label={lang.infoStep.form.inputProjectDevLink.label}
              setLink={setDevLink}
              url={devLink}
              placeholder={lang.infoStep.form.inputProjectDevLink.placeholder}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

BasicInfoForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    initialDate: PropTypes.number,
    url: PropTypes.string,
    deployUrl: PropTypes.string,
  }),
  show: PropTypes.bool,
};
BasicInfoForm.defaultProps = {
  data: {
    name: '',
    description: '',
    initialDate: null,
  },
  show: false,
};

export default BasicInfoForm;
