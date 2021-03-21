// Ext libs
import React /* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';

const PersonalDataForm = ({ data, edit }) => {
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
            value={data.email}
            onChange={(event) => edit('email', event.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label={lang.contactDataStep.form.phone.label}
            placeholder={lang.contactDataStep.form.phone.placeholder}
            margin="dense"
            value={data.phone}
            onChange={(event) => edit('phone', event.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label={lang.contactDataStep.form.gitlabLink.label}
            placeholder={lang.contactDataStep.form.gitlabLink.placeholder}
            margin="dense"
            variant="outlined"
            fullWidth
            value={data.gitlab}
            onChange={(event) => edit('gitlab', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label={lang.contactDataStep.form.linkedinLink.label}
            placeholder={lang.contactDataStep.form.linkedinLink.placeholder}
            margin="dense"
            variant="outlined"
            fullWidth
            value={data.linkedin}
            onChange={(event) => edit('linkedin', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label={lang.contactDataStep.form.twitterLink.label}
            placeholder={lang.contactDataStep.form.twitterLink.placeholder}
            margin="dense"
            variant="outlined"
            fullWidth
            value={data.twitter}
            onChange={(event) => edit('twitter', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label={lang.contactDataStep.form.githubLink.label}
            placeholder={lang.contactDataStep.form.githubLink.placeholder}
            margin="dense"
            variant="outlined"
            fullWidth
            value={data.github}
            onChange={(event) => edit('github', event.target.value)}
          />
        </Grid>
      </Grid>
    </StepItem>
  );
};
PersonalDataForm.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    gitlab: PropTypes.string.isRequired,
  }).isRequired,
  edit: PropTypes.func.isRequired,
};
export default React.memo(PersonalDataForm);
