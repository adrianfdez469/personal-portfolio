import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import MaterialCard from '../cards/MaterialCard';
import useStyles from './styles';

const LandingAbout = () => {
  const classes = useStyles();
  const text = `Hi, I m a enthusiast React an next developer 
  with just 1 year of experience in the world of the web 
  development with this technologies. I love music, footbal 
  and I have a lot of fun creating new Material-UI components. 
  Hi, I'm a enthusiast React an next developer with just 1 
  year of experience in the world of the web development with 
  this technologies. I love music, footbal and I have a lot of 
  fun creating new Material-UI components. Hi, I'm a enthusiast 
  React an next developer with just 1 year of experience in the 
  world of the web development with this technologies. I love 
  music, footbal and I have a lot of fun creating new 
  Material-UI components.`;

  return (
    <div className={classes.aboutStyle}>
      <Container>
        <Box align="center">
          <Typography variant="h4" className={classes.headerText} color="primary">
            JUST ABOUT US
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
                frontImage="/images/11.jpg"
                frontBarText="Jhon Wick"
                backHeading="Resume"
                backText={text}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="/images/12.jpeg"
                frontBarText="Captain Marvel"
                backHeading="Resume"
                backText={text}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box align="center">
              <MaterialCard
                frontImage="/images/13.jpeg"
                frontBarText="Hawk Eye"
                backHeading="Resume"
                backText={text}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default LandingAbout;
