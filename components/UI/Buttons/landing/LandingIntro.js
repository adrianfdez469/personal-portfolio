import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: 400,
  },
  paper: {
    background: 'rgba(205, 205, 205, 0.6)',
    borderRadius: 20,
    color: 'white',
    textShadow: '1px 1px #000000',
    zIndex: 100,
    // opacity: 0.5,
  },
  second: {
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  first: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
  },
}));
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
            <Link href="/api/auth/signin" passHref>
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
