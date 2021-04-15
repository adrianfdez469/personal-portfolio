import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Container, Divider, Grid, Grow, IconButton, Paper, Typography } from '@material-ui/core';
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import GitHub from '@material-ui/icons/GitHub';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Facebook from '@material-ui/icons/Facebook';
import useStyles from './styles';

const MaterialCard = ({ frontImage, frontBarText, backHeading, backText }) => {
  const classes = useStyles();
  const [showDetail, setshowDetail] = useState(false);

  const changeView = () => {
    setshowDetail(!showDetail);
  };

  let className = classes.cardFrontBar;
  let arrow = <ArrowForwardIosRounded />;
  if (showDetail) {
    className += ` ${classes.cardFrontBarDetail}`;
    arrow = <ArrowBackIosRounded />;
  }

  return (
    <Paper className={classes.cardSize}>
      <Grow in={!showDetail}>
        <div id="front" className={classes.cardFront}>
          <Image layout="fill" src={frontImage} alt="avatar" quality={50} objectFit="cover" />
        </div>
      </Grow>
      <Paper id="bar" className={className}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.cardFrontBarContainer}
        >
          <Grid item xs={10}>
            <Typography variant="h6" noWrap align="center" className={classes.cardFrontBarText}>
              {frontBarText}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton className={classes.cardFrontBarButton} onClick={changeView} size="small">
              {arrow}
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Grow in={showDetail}>
        <Container className={classes.cardBack}>
          <Grid container direction="column" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" align="center">
                {backHeading}
              </Typography>
            </Grid>
            {/* <Grid item> */}
            {/* </Grid> */}
            <Grid item>
              <Divider orientation="horizontal" variant="middle" />
              <Typography align="center" className={classes.cardBackText}>
                {backText}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.cardBackSocialButtonsContainer}
          >
            <Grid item>
              <IconButton>
                <GitHub />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <LinkedIn />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Facebook />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Paper>
  );
};
export default MaterialCard;

MaterialCard.propTypes = {
  frontImage: PropTypes.string.isRequired,
  frontBarText: PropTypes.string.isRequired,
  backHeading: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
};
