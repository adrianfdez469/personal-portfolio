import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Grid, Hidden } from '@material-ui/core';
import useStyles from './styles';
import IntroHeader from './introHeader/IntroHeader';
import LanguageButton from '../Buttons/LanguageButton';
import { useLang } from '../../../store/contexts/langContext';

const LandingIntro = () => {
  const classes = useStyles();
  const { lang } = useLang();

  return (
    <>
      <Container className={classes.root}>
        <Box align="end">
          <LanguageButton title={lang.buttons.languageButton} />
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
              <Hidden lgDown>
                <IntroHeader mainHeadingVariant="h1" secondaryHeadingVariant="h5" />
              </Hidden>
              <Hidden xlUp smDown>
                <IntroHeader mainHeadingVariant="h2" secondaryHeadingVariant="h6" />
              </Hidden>
              <Hidden mdUp xsDown>
                <IntroHeader mainHeadingVariant="h3" secondaryHeadingVariant="subtitle1" />
              </Hidden>
              <Hidden smUp>
                <IntroHeader mainHeadingVariant="h4" secondaryHeadingVariant="body1" />
              </Hidden>
              <Typography align="center" variant="body2" className={classes.first}>
                {`${lang.poweredBy} ®`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingIntro;
