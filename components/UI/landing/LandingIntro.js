import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Grid, Hidden, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Brightness7, Language } from '@material-ui/icons';
import Link from 'next/link';
import useStyles from './styles';
import IntroHeader from './introHeader/IntroHeader';
import useMessage from '../../../hooks/useMessage';

const LandingIntro = () => {
  const classes = useStyles();
  const [showMessage] = useMessage();

  const show = () => {
    showMessage(
      'Lo hemos logrado, esto es lo que queriamos hacer asd asd asdasd asdasda asdasdad fwwfwefw casdasdad.',
      'default'
    );
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container className={classes.root}>
        <Box align="end">
          <IconButton
            className={classes.globalButtons}
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Language />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href="/" locale="en">
              <MenuItem onClick={handleClose}>English</MenuItem>
            </Link>
            <Link href="/" locale="es">
              <MenuItem onClick={handleClose}>Español</MenuItem>
            </Link>
          </Menu>
          <IconButton className={classes.globalButtons} onClick={show}>
            <Brightness7 />
          </IconButton>
        </Box>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: '85vh' }}
        >
          <Grid item>
            <Box align="center">
              <Hidden lgDown>
                <IntroHeader mainHeadingVariant="h1" secondaryHeadingVariant="h5" />
              </Hidden>
              <Hidden xlUp smDown>
                <IntroHeader mainHeadingVariant="h2" secondaryHeadingVariant="h6" />
              </Hidden>
              <Hidden mdUp xsDown>
                <IntroHeader mainHeadingVariant="h3" secondaryHeadingVariant="subtitle1" />
              </Hidden>
              <Hidden smUp>
                <IntroHeader mainHeadingVariant="h4" secondaryHeadingVariant="body1" />
              </Hidden>
              <Typography align="center" variant="body2" className={classes.first}>
                Powered By SAR Designs ®
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingIntro;
