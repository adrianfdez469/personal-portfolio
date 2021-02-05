import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Grid, IconButton, Paper } from '@material-ui/core';
import Link from 'next/link';
import { Brightness7, Language } from '@material-ui/icons';
import useStyles from './styles';

const LandingIntro = () => {
  const classes = useStyles();
  return (
    <>
      <Box align="end">
        <IconButton>
          <Language />
        </IconButton>
        <IconButton>
          <Brightness7 />
        </IconButton>
        {/* <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
        <IconButton>
        <Language />
      </IconButton>
        </Grid>
        </Grid>       */}
      </Box>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper align="center" className={classes.paper}>
          <Grid item className={classes.first}>
            <Typography align="center" variant="h4">
              Welcome to portfolio!
            </Typography>
          </Grid>
          <Grid item className={classes.second}>
            <Typography align="center">
              The place where developers can expose their work to everyone
            </Typography>
          </Grid>
          <Grid item className={classes.second}>
            <Link href="/auth/signin?callbackUrl=http://localhost:3000/" passHref>
              <Button variant="contained" color="primary" component="a">
                Login
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default LandingIntro;
