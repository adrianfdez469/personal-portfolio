import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Container,
  Hidden,
  Box,
  Divider,
  useTheme,
} from '@material-ui/core';
import useStyles from './styles';

const LandingFeatures = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Paper className={classes.featuresBack}>
      <Container maxWidth="xl">
        <Hidden smDown>
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={3}>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
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
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={3}>
              <Grid item sm={4}>
                <Paper className={classes.featuresImgContainer}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={3}>
            <Grid container align="center" justify="center" direction="row" spacing={3}>
              <Grid item sm={8}>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
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
            <Grid container align="center" justify="center" direction="column" spacing={3}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={2} align="center">
            <Grid container align="center" justify="center" direction="column" spacing={3}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box p={3} m={2} align="center">
            <Grid container align="center" justify="center" direction="column" spacing={3}>
              <Grid item>
                <Paper className={classes.featuresImgContainerVert}>
                  <img className={classes.featuresImg} alt="complex" src="/images/1.jpg" />
                </Paper>
              </Grid>
              <Grid item>
                <Box align="center">
                  <Typography gutterBottom variant="h5" align="center" color="primary">
                    Standard license
                  </Typography>
                  <Divider
                    variant="middle"
                    component="div"
                    className={classes.featureCardDivider}
                  />
                  <Typography variant="body1" align="justify" className={classes.featureCardText}>
                    The responsive grid focuses on consistent spacing widths, than column width.
                    Material Design margins and columns an 8px square baseline grid. The spacing
                    property is an integer between 0 and 10 inclusive. By default, the spacing
                    between two grid items follows a linear function: output(spacing) = spacing *
                    8px, e.g. spacing=
                    {2}
                    creates a 16px wide gap.
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
