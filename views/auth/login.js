// Libs
import React from 'react';
import {
  LinkedInLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const AuthenticationPage = () => {

  const classes = useStyles();

  const loginWithLinkedInHandler = () => {
    console.log('Login with linkedIn not implemented');
  }

  const loginWithGithub = () => {
    console.log('Login whit github not implemented');
  }

  const loginWithGoogle = () => {
    console.log('Login whit google not implemented');
  }

  return (
    <Box>
      <Box style={{ marginBottom: 20 }}>
        <LinkedInLoginButton onClick={loginWithLinkedInHandler} />
      </Box>
      <Box style={{ marginBottom: 20 }}>
        <GithubLoginButton onClick={loginWithGithub} />
      </Box>
      <Box style={{ marginBottom: 20 }}>
        <GoogleLoginButton onClick={loginWithGoogle} />
      </Box>
    </Box>
  )
};

export default AuthenticationPage;
