import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Container, Grid, Hidden, IconButton } from '@material-ui/core';
import Link from 'next/link';
import { Brightness7, Language } from '@material-ui/icons';
import useStyles from './styles';

const LandingIntro = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.root}>
        <Box align="end">
          <IconButton>
            <Language />
          </IconButton>
          <IconButton>
            <Brightness7 />
          </IconButton>
        </Box>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: '85vh' }}
        >
          <Grid item>
            <Box align="center">
              <Hidden xsDown>
                <Typography variant="h1" color="primary" className={classes.heading}>
                  PERSONAL PORTFOLIO™
                </Typography>
                <Typography align="center" variant="h5" className={classes.first}>
                  The place where you can expose your work to the world
                </Typography>
                <Link href="/auth/signin?callbackUrl=http://localhost:3000/" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component="a"
                    className={classes.first}
                  >
                    Get started
                  </Button>
                </Link>
              </Hidden>
              <Hidden smUp>
                <Typography variant="h4" color="primary" className={classes.heading}>
                  PERSONAL PORTFOLIO™
                </Typography>
                <Typography align="center" className={classes.first}>
                  The place where you can expose your work to the world
                </Typography>
                <Link href="/auth/signin?callbackUrl=http://localhost:3000/" passHref>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    component="a"
                    className={classes.first}
                  >
                    Get started
                  </Button>
                </Link>
              </Hidden>

              <Typography align="center" variant="body2" className={classes.first}>
                Powered By SAR Designs ®
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingIntro;
