import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper } from '@material-ui/core';
import Link from 'next/link';
import useStyles from './styles';

const LandingIntro = () => {
  const classes = useStyles();
  return (
    <>
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
            <Button variant="contained" color="primary">
              Add Project
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default LandingIntro;
