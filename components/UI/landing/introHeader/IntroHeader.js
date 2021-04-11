import { Button, Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { useLang } from '../../../../store/contexts/langContext';

const IntroHeader = ({ mainHeadingVariant, secondaryHeadingVariant }) => {
  const classes = useStyles();
  const { lang } = useLang();
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
            {lang.subtitle}
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
              {lang.startBtn}
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
