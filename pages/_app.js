/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import ThemeProvider from '../store/contexts/themeContext';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Personal Portfolio</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider loadedTheme={pageProps.theme}>
        <SnackbarProvider maxSnack={3}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider session={pageProps.session}>
            {/* Put the basic layout here to share between pages */}
            <Component {...pageProps} />
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
