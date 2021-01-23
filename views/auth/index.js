// Libs
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  Card,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AccountCircleOutlined, Visibility, VisibilityOff, LockOutlined } from '@material-ui/icons';
// Styles
import useStyles from './styles';
// Components
import { LoginButtonFactory } from '../../components/UI/index';

const AuthenticationPage = ({ providers }) => {
  const classes = useStyles();
  const [showPass, setShowPass] = useState(false);
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smallerXsSize = useMediaQuery((theme) => theme.breakpoints.down(390));

  const handleClickShowPassword = () => {
    setShowPass((state) => !state);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const contentBox = (
    <Box className={classes.container}>
      <Box className={classes.form}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          // color="primary"
          style={{ textAlign: 'center' }}
        >
          Sign in with
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.textField}
            placeholder="Email"
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlined /* color="primary" */ />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.textField}
            placeholder="Password"
            autoComplete="current-password"
            type={showPass ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined /* color="primary" */ />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPass ? (
                      <Visibility /* color="primary" */ />
                    ) : (
                      <VisibilityOff /* color="primary" */ />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>

      <Box my={2} className={classes.separator}>
        <Divider
          className={classes.divider}
          orientation={greaterMdSize ? 'vertical' : 'horizontal'}
        />
        <Box className={classes.circle}>
          <Typography variant="button" className={classes.circleText}>
            OR
          </Typography>
        </Box>
      </Box>

      <Box className={classes.loginButtons}>
        {Object.values(providers).map((provider) => (
          <LoginButtonFactory id={provider.id} key={provider.id} />
        ))}
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" className={classes.overAllContainer}>
      {smallerXsSize ? contentBox : <Card className={classes.card}>{contentBox}</Card>}
    </Container>
  );
};

AuthenticationPage.propTypes = {
  providers: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AuthenticationPage;
