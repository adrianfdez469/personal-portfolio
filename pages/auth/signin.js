import React from 'react';
import { providers as providersFunc } from 'next-auth/client';
import Login from '../../views/auth/login';

// eslint-disable-next-line react/prop-types
const SignIn = ({ providers }) => <Login providers={{ ...providers }} />;

SignIn.getInitialProps = async (context) => ({
  providers: await providersFunc(context),
});

export default SignIn;
