import React from 'react';
import Image from 'next/image';
import { Grid, Typography, Paper, Container, Box, Divider } from '@material-ui/core';
import { useLang } from '../../../store/contexts/langContext';
import useStyles from './styles';

const LandingFeatures = () => {
  const styles = useStyles();
  const { lang } = useLang();

  return (
    <Paper className={styles.featuresBack}>
      <Container maxWidth="md">
        <Grid container alignContent="space-between" spacing={4}>
          <Grid item sm={12}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title1}
              </Typography>
              <Box mb={3} className={styles.imageWrapper}>
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

              <Divider variant="middle" component="div" className={styles.featureCardDivider} />
              <Typography variant="body1" align="justify" className={styles.featureCardText}>
                {lang.info.text1}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title2}
              </Typography>
              <Box mb={3} className={styles.imageWrapper}>
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

              <Divider variant="middle" component="div" className={styles.featureCardDivider} />
              <Typography variant="body1" align="justify" className={styles.featureCardText}>
                {lang.info.text2}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title3}
              </Typography>
              <Box mb={3} className={styles.imageWrapper}>
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

              <Divider variant="middle" component="div" className={styles.featureCardDivider} />
              <Typography variant="body1" align="justify" className={styles.featureCardText}>
                {lang.info.text3}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box style={{ marginBottom: 16, marginTop: 16 }}>
              <Typography gutterBottom variant="h4" align="center" color="primary">
                {lang.info.title4}
              </Typography>
              <Box mb={3} className={styles.imageWrapper}>
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

              <Divider variant="middle" component="div" className={styles.featureCardDivider} />
              <Typography variant="body1" align="justify" className={styles.featureCardText}>
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
