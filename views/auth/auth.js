// Libs
import React from 'react';
import { Container, Typography, TextField, Divider, useMediaQuery, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import { useLang } from '../../store/contexts/langContext';
// Styles
import useStyles from './styles';
// Components
import { LoginButtonFactory } from '../../components/UI/index';

const AuthenticationPage = ({ providers, csrfToken, baseUrl }) => {
  const classes = useStyles();
  const greaterXsSize = useMediaQuery((theme) => theme.breakpoints.up(390));
  const router = useRouter();
  const { lang } = useLang();

  return (
    <Container maxWidth="xs" className={classes.overAllContainer}>
      <Paper className={classes.card} style={{ display: greaterXsSize ? 'block' : 'contents' }}>
        {router.query && router.query.error === 'OAuthAccountNotLinked' && (
          <Typography align="center" color="primary">
            {lang.oAuthAccountNotLinkedMsg}
          </Typography>
        )}
        <div className={classes.container}>
          {providers.email && (
            <>
              <div className={classes.form}>
                <form className={classes.form} method="post" action="/api/auth/signin/email">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <TextField
                    name="email"
                    id="email"
                    className={classes.textField}
                    label={lang.emailLabel}
                    placeholder={lang.examleEmail}
                    autoComplete="email"
                    variant="outlined"
                    margin="dense"
                  />
                  <LoginButtonFactory id="email" key="email" type="submit" />
                </form>
              </div>

              <div my={2} className={classes.separator}>
                <Divider className={classes.divider} orientation="horizontal" />
                <div className={classes.circle}>
                  <Typography variant="button" className={classes.circleText}>
                    {lang.orSeparator}
                  </Typography>
                </div>
              </div>
            </>
          )}

          <div className={classes.loginButtons}>
            {Object.values(providers)
              .filter((provider) => provider.id !== 'email')
              .map((provider) => (
                <LoginButtonFactory id={provider.id} key={provider.id} baseUrl={baseUrl} />
              ))}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

AuthenticationPage.propTypes = {
  providers: PropTypes.objectOf(PropTypes.object).isRequired,
  csrfToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default AuthenticationPage;
