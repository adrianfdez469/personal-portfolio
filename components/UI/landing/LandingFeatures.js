import React from 'react';
import Image from 'next/image';
import { Grid, Typography, Paper, Container, Hidden, Box, Divider } from '@material-ui/core';
import { useLang } from '../../../store/contexts/langContext';
import useStyles from './styles';

const LandingFeatures = () => {
  const classes = useStyles();
  const { lang } = useLang();

  return (
    <Paper className={classes.featuresBack}>
      <Container maxWidth="xl">
        <Box align="center" m={4} mb={8}>
          <Typography variant="h4" className={classes.headerText} color="primary">
            SHOW YOUR WORK TO EVERYONE
          </Typography>
          <Divider variant="middle" component="div" className={classes.featureCardDivider} />
        </Box>

        <Grid container alignContent="space-between" spacing={4}>
          <Grid item sm={12} md={6}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title1}
              </Typography>
              <Box mb={3} className={classes.imageWrapper}>
                <Image
                  alt="image"
                  src="skills_wdamt2.jpg"
                  layout="responsive"
                  quality={50}
                  width={300}
                  height={250}
                  objectFit="cover"
                />
              </Box>

              <Divider variant="middle" component="div" className={classes.featureCardDivider} />
              <Typography variant="body1" align="justify" className={classes.featureCardText}>
                {lang.info.text1}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title2}
              </Typography>
              <Box mb={3} className={classes.imageWrapper}>
                <Image
                  alt="image"
                  src="work_or1c1k.jpg"
                  layout="responsive"
                  quality={50}
                  width={300}
                  height={250}
                  objectFit="cover"
                />
              </Box>

              <Divider variant="middle" component="div" className={classes.featureCardDivider} />
              <Typography variant="body1" align="justify" className={classes.featureCardText}>
                {lang.info.text2}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title3}
              </Typography>
              <Box mb={3} className={classes.imageWrapper}>
                <Image
                  alt="image"
                  src="skills1_obuswt.jpg"
                  layout="responsive"
                  quality={50}
                  width={300}
                  height={250}
                  objectFit="cover"
                />
              </Box>

              <Divider variant="middle" component="div" className={classes.featureCardDivider} />
              <Typography variant="body1" align="justify" className={classes.featureCardText}>
                {lang.info.text3}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title4}
              </Typography>
              <Box mb={3} className={classes.imageWrapper}>
                <Image
                  alt="image"
                  src="profile-pictures_yn3edd.jpg"
                  layout="responsive"
                  quality={50}
                  width={300}
                  height={250}
                  objectFit="cover"
                />
              </Box>

              <Divider variant="middle" component="div" className={classes.featureCardDivider} />
              <Typography variant="body1" align="justify" className={classes.featureCardText}>
                {lang.info.text4}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/*
        <Hidden smDown>
          <Box p={3} m={6}>
            <Grid container align="center" justify="center" direction="row" spacing={5}>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    {lang.info.title1}
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    {lang.info.text1}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <Image
                    layout="fill"
                    src="/images/skills1.jpg"
                    alt="image"
                    quality={50}
                    objectFit="cover"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={5}>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <Image
                    layout="fill"
                    src="/images/work.jpg"
                    alt="image"
                    quality={50}
                    objectFit="cover"
                  />
                </Paper>
              </Grid>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h4" align="center" color="primary">
                    {lang.info.title2}
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    {lang.info.text2}
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
                    {lang.info.title3}
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="h6" align="justify" className={classes.featureCardText}>
                    {lang.info.text3}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <Image
                    layout="fill"
                    src="/images/1.jpg"
                    alt="image"
                    quality={50}
                    objectFit="cover"
                  />
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
                  <Image
                    layout="fill"
                    src="/images/skills1.jpg"
                    alt="image"
                    quality={30}
                    objectFit="cover"
                  />
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
                  <Image
                    layout="fill"
                    src="/images/work.jpg"
                    alt="image"
                    quality={30}
                    objectFit="cover"
                  />
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
                  <Image
                    layout="fill"
                    src="/images/1.jpg"
                    alt="image"
                    quality={30}
                    objectFit="cover"
                  />
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
      */}
      </Container>
    </Paper>
  );
};

export default LandingFeatures;
