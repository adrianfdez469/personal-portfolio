import { Button, Grid } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import useStyles from './styles';
import { useLang } from '../../../../store/contexts/langContext';

const IntroHeader = () => {
  const classes = useStyles();
  const { lang } = useLang();
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{ width: '100%' }}>
          <img
            style={{ maxWidth: '90%', minWidth: '45%' }}
            src="/images/ingles.png"
            alt="Personal Portfolio Title and Logo"
          />
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

export default IntroHeader;
