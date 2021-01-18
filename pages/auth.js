import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import LoginView from '../views/auth/login';

const AuthenticationPage = () => (
  <Container maxWidth="sm">
    <Box my={4} style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h5" component="h1" gutterBottom style={{ textAlign: 'center' }}>
        Login or Sign Up
      </Typography>
      <LoginView />
    </Box>
  </Container>
);

export default AuthenticationPage;
