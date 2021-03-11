// Ext libs
import React /* , { useState, useEffect } */ from 'react';
import { Grid, TextField } from '@material-ui/core';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import LinkPreview from '../../../../../components/UI/LinkPreview';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';

const PersonalDataForm = () => {
  // constants
  const { lang } = useLang();

  /* const handleChange = (field, value) => {
    console.log('Changing data');
  }; */

  return (
    <StepItem label={lang.contactDataStep.header.label}>
      <Grid container justify="space-between" spacing={1}>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label={lang.contactDataStep.form.email.label}
            placeholder={lang.contactDataStep.form.email.placeholder}
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
            label={lang.contactDataStep.form.phone.label}
            placeholder={lang.contactDataStep.form.phone.placeholder}
            margin="dense"
            // onChange={(event) => handleChange('name', event.target.value)}
            // value={data.name}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkPreview
            fullWidth
            label={lang.contactDataStep.form.facebookLink.label}
            placeholder={lang.contactDataStep.form.facebookLink.placeholder}
            // url={data.devLink.url}
            // setLink={handleSetProjectDevLink}
            // setPreview={handleSetProjectDevPreview}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkPreview
            fullWidth
            label={lang.contactDataStep.form.linkedinLink.label}
            placeholder={lang.contactDataStep.form.linkedinLink.placeholder}
            // url={data.devLink.url}
            // setLink={handleSetProjectDevLink}
            // setPreview={handleSetProjectDevPreview}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkPreview
            fullWidth
            label={lang.contactDataStep.form.twitterLink.label}
            placeholder={lang.contactDataStep.form.twitterLink.placeholder}
            // url={data.devLink.url}
            // setLink={handleSetProjectDevLink}
            // setPreview={handleSetProjectDevPreview}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkPreview
            fullWidth
            label={lang.contactDataStep.form.githubLink.label}
            placeholder={lang.contactDataStep.form.githubLink.placeholder}
            // url={data.devLink.url}
            // setLink={handleSetProjectDevLink}
            // setPreview={handleSetProjectDevPreview}
          />
        </Grid>
      </Grid>
    </StepItem>
  );
};

export default React.memo(PersonalDataForm);
