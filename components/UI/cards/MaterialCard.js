// import {
//   Avatar,
//   Button,
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Typography,
// } from '@material-ui/core';
// // import styles from './styles.scss';
// import { React, useState } from 'react';
// import useStyles from './styles';

// const classnames = require('classnames');

// const MaterialCards = () => {
//   const classes = useStyles();
//   const [detailVisible, setDetailVisible] = useState(false);

//   const mediaClass = classnames({
//     aboutCardMedia: !detailVisible,
//   });

//   const contentClass = classnames({
//     aboutCardContent: true,
//     aboutCardContentShow: !detailVisible,
//   });

//   let content = '';
//   if (true) {
//     content = (
//       <CardContent className={classes[contentClass]}>
//         <div className={classes.aboutCardBack}>
//           <Avatar alt="Remy Sharp" src="/images/1.jpg" className={classes.aboutCardLargeImg} />

//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </div>
//       </CardContent>
//     );
//   }

//   return (
//     <Card className={classes.aboutCardRoot}>
//       <CardMedia className={classes[mediaClass]} image="/images/1.jpg" />
//       {content}
//       <CardActions>
//         <Button
//           size="small"
//           color="primary"
//           onClick={() => {
//             setDetailVisible(!detailVisible);
//           }}
//         >
//           Details
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default MaterialCards;

import { Container, Divider, Grid, Grow, IconButton, Paper, Typography } from '@material-ui/core';
import {
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
  GitHub,
  LinkedIn,
  Facebook,
} from '@material-ui/icons';
import React, { useState } from 'react';
import useStyles from './styles';

const MaterialCard = (props) => {
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
          <img className={classes.cardFrontImage} alt="avatar" src={props.frontImage} />
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
              {props.frontBarText}
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
                {props.backHeading}
              </Typography>
            </Grid>
            {/* <Grid item> */}
            {/* </Grid> */}
            <Grid item>
              <Divider orientation="horizontal" variant="middle" />
              <Typography align="center" className={classes.cardBackText}>
                {props.backText}
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
