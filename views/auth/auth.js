// Libs
import React from 'react';
import {
  Container,
  Typography,
  /* TextField, Divider, */ useMediaQuery,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { useLang } from '../../store/contexts/langContext';
// Styles
import useStyles from './styles';
// Components
import { LoginButtonFactory } from '../../components/UI/index';
import Backdrop from '../../components/UI/backdrop';

const AuthenticationPage = ({ baseUrl }) => {
  const classes = useStyles();
  const greaterXsSize = useMediaQuery((theme) => theme.breakpoints.up(390));
  const router = useRouter();
  const { lang } = useLang();
  const [session, loading] = useSession();
  const [routing, setRouting] = React.useState(false);

  React.useEffect(() => {
    if (session && session.userId) {
      setRouting(true);
      router.push(`${baseUrl}/profile/${session.userId}`);
    }
  }, [session]);

  /* const [csrfToken, setCsrfToken] = React.useState();

  React.useEffect(() => {
    getCsrfToken().then((csrf) => setCsrfToken(csrf));
  }, []); */

  return (
    <div className={classes.back}>
      <Container maxWidth="xs" className={classes.overAllContainer}>
        <Paper className={classes.card} style={{ display: greaterXsSize ? 'block' : 'contents' }}>
          {router.query && router.query.error === 'OAuthAccountNotLinked' && (
            <Typography align="center" color="primary">
              {lang.oAuthAccountNotLinkedMsg}
            </Typography>
          )}
          <div className={classes.container}>
            {/* <div className={classes.form}>
              <form className={classes.form} method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" value={csrfToken} />
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
                <LoginButtonFactory id="email" />
              </form>
            </div>

            <div my={2} className={classes.separator}>
              <Divider className={classes.divider} orientation="horizontal" />
              <div className={classes.circle}>
                <Typography variant="button" className={classes.circleText}>
                  {lang.orSeparator}
                </Typography>
              </div>
            </div> */}

            <div className={classes.loginButtons}>
              <LoginButtonFactory id="github" />
              <LoginButtonFactory id="google" />
              <LoginButtonFactory id="linkedin" />
            </div>
          </div>
        </Paper>
      </Container>
      <Backdrop open={loading || routing} />
    </div>
  );
};

AuthenticationPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default AuthenticationPage;
