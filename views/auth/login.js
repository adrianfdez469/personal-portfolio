// Libs
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  Card,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AccountCircleOutlined, Visibility, VisibilityOff, LockOutlined } from '@material-ui/icons';
// Components
import LoginButtonFactory from '../../components/UI/Buttons/LoginButtonFactory';

const useStyles = makeStyles((theme) => ({
  overAllContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    padding: theme.spacing(2),
  },
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyItems: 'center',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  separator: {
    margin: theme.spacing(2),
    width: theme.spacing(34),

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(25),
    },
  },
  loginButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: theme.spacing(25),
  },
  circle: {
    border: '1px solid #bbb',
    padding: theme.spacing(1.5),
    borderRadius: '50%',
    height: theme.spacing(5),
    width: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    zIndex: 99,
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(15),
    },
  },
  circleText: {
    color: '#bbb',
  },
  divider: {
    position: 'relative',
    top: theme.spacing(2.5),
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      top: theme.spacing(0),
      margin: 'auto',
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

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
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          placeholder="Email"
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
          id="input-with-icon-textfield"
          placeholder="Password"
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
