import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import MaterialCard from '../cards/MaterialCard';
import useStyles from './styles';
import { useLang } from '../../../store/contexts/langContext';

const LandingAbout = () => {
  const classes = useStyles();
  const { lang } = useLang();

  return (
    <div className={classes.aboutStyle}>
      <Container>
        <Box align="center">
          <Typography variant="h4" className={classes.headerText} color="primary">
            {lang.aboutUs.title}
          </Typography>
        </Box>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: '2em' }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="Thor_ivzviy.jpg"
                frontBarText="Thor"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.adrianBio}
                quality={20}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="blackPanther_km4ye9.jpg"
                frontBarText="Black Panther"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.joseBio}
                quality={5}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="ironMan_pslbbv.jpg"
                frontBarText="Iron Man"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.jorgeBio}
                quality={1}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default LandingAbout;
