import React from 'react';
import Image from 'next/image';
import { Grid, Typography, Paper, Container, Box, Divider } from '@material-ui/core';
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
      </Container>
    </Paper>
  );
};

export default LandingFeatures;
