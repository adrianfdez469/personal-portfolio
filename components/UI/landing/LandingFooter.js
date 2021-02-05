import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { Email, Facebook, GitHub, LinkedIn, Room } from '@material-ui/icons';
import React from 'react';
import useStyles from './styles';

const LandingFooter = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.footerStyle}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          style={{ marginBottom: '1.5em', paddingLeft: '1em' }}
        >
          PERSONAL PORTFOLIO™
        </Typography>
        <Typography variant="h5" align="center">
          FOLLOW US HERE
        </Typography>
        <Box align="center">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <IconButton>
                <LinkedIn fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <GitHub fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Facebook fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Divider variant="middle" />
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          <Grid item style={{ marginTop: '0.8em' }}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Box align="center">
                  <Avatar>
                    <Room />
                  </Avatar>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Havana, Cuba</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '0.8em' }}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Box align="center">
                  <Avatar>
                    <Email />
                  </Avatar>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">personalportfolio@gmail.com</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography align="center" style={{ marginTop: '1.5em' }}>
          copyright ® 2021
        </Typography>
      </Container>
    </Paper>
  );
};

export default LandingFooter;
