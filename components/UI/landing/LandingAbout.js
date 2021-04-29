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
                frontImage="my-avatar_katkth.jpeg"
                frontBarText="Adrián Fernández Martínez"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.adrianBio}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="jose-avatar_rem7ih.jpg"
                frontBarText="Jose Adrian Iglesias"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.joseBio}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="jorge-avatar_kfkqwq.jpeg"
                frontBarText="Jorge Arce Martínez"
                backHeading={lang.aboutUs.resume}
                backText={lang.aboutUs.jorgeBio}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default LandingAbout;
