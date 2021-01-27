import React from 'react';
import { providers as providersFunc } from 'next-auth/client';
import { LoginView } from '../../views';

// eslint-disable-next-line react/prop-types
const SignIn = ({ providers }) => <LoginView providers={{ ...providers }} />;

/*
 SignIn.getInitialProps = async (context) => ({
  providers: await providersFunc(context),
}); */

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providersFunc(context),
    },
  };
}

export default SignIn;
