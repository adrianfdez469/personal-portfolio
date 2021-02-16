import React from 'react';
import { Grid, Typography, Paper, Container, Hidden, Box, Divider } from '@material-ui/core';
import useStyles from './styles';

const LandingFeatures = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.featuresBack}>
      <Container maxWidth="xl">
        {/* <Box align="center">
          <Typography variant="h4" className={classes.headerText} color="primary">
            SHOW YOUR WORK TO EVERYONE
          </Typography>
        </Box> */}
        <Hidden smDown>
          <Box p={3} m={6}>
            {/* <Paper className={classes.featuresCardHover}> */}
            <Grid container align="center" justify="center" direction="row" spacing={5}>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SET YOUR SKILLS
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    You can register all the knowleage and abilities you has adquired across the
                    years to make you a first line professional.
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <img className={classes.featuresImg} alt="complex" src="/images/skills1.jpg" />
                </Paper>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Box>
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={5}>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <img className={classes.featuresImg} alt="complex" src="/images/work.jpg" />
                </Paper>
              </Grid>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SHOW YOUR WORK
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    Register all the work that you have done, upload some pictures of it or set a
                    link to where people can see it.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={5}>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SHARE
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    Show yourself to the world. Share your Personal Potrfolio™ link to let everyone
                    to know you.
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box p={3} m={2} align="center">
            <Grid container align="center" justify="center" direction="column" spacing={5}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/skills1.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SET YOUR SKILLS
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    You can register all the knowleage and abilities you has adquired across the
                    years to make you a first line professional.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={2} align="center">
            <Grid container align="center" justify="center" direction="column" spacing={5}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/work.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SHOW YOUR WORK
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    Register all the work that you have done, upload some pictures of it or set a
                    link to where people can see it.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={2} align="center">
            <Grid container align="center" justify="center" direction="column" spacing={5}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    SHARE
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    Show yourself to the world. Share your Personal Potrfolio™ link to let everyone
                    to know you.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>
      </Container>
    </Paper>
  );
};

export default LandingFeatures;
