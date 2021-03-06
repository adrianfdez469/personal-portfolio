import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { orangeDark as theme } from '../themes';

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
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider session={pageProps.session}>
            {/* Put the basic layout here to share between pages */}
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </Provider>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    statusCode: PropTypes.number,
    session: PropTypes.string,
  }).isRequired,
};

export default MyApp;
