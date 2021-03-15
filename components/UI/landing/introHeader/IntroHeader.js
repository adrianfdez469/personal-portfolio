import { Button, Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const IntroHeader = ({ mainHeadingVariant, secondaryHeadingVariant }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant={mainHeadingVariant} className={classes.heading}>
            PERSONAL PORTFOLIO™
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant={secondaryHeadingVariant} className={classes.first}>
            The place where you can expose your work to the world
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/auth/signin" passHref>
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
        </Grid>
      </Grid>
    </>
  );
};

IntroHeader.propTypes = {
  mainHeadingVariant: PropTypes.string.isRequired,
  secondaryHeadingVariant: PropTypes.string.isRequired,
};

export default IntroHeader;
