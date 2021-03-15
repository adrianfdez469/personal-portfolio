import React, { useCallback, useState } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import { Box, Button, Card, CardActions, Collapse, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { Cancel, CheckCircle, Clear, Close, ExpandMore, Info, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from './styles';

const CustomSnackbar = React.forwardRef(({ message, type, id }, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className={`${classes[type]} ${classes.rootCSB}`}>
      <Card className={classes.cardCSB}>
        <CardActions classes={{ root: classes.actionRootCSB }}>
          <Typography variant="subtitle2" className={classes.typographyCSB}>
            {message}
          </Typography>
          <div className={classes.iconsCSB}>
            <IconButton
              aria-label="Show more"
              // className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
              className={`${classes.expandCSB} ${expanded ? classes.expandOpenCSB : classes.clase}`}
              onClick={handleExpandClick}
            >
              <ExpandMore />
            </IconButton>
            <IconButton className={classes.expandCSB} onClick={handleDismiss}>
              <Close />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper className={classes.collapseCSB}>
            <Typography gutterBottom>here we are going to put the long text, so when the message goes beyond one line, the user can expand the message to see the full message</Typography>
            {/* <Button size="small" className={classes.buttonCSB}>
              <CheckCircle className={classes.checkIconCSB} />
              Download now
            </Button> */}
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );

  // const classes = useStyles();
  // const { closeSnackbar } = useSnackbar();
  // const handleDismiss = () => {
  //   closeSnackbar(id);
  // };
  // let messageIcon = '';
  // switch (type) {
  //   case 'info':
  //     messageIcon = <Info />;
  //     break;
  //   case 'success':
  //     messageIcon = <CheckCircle />;
  //     break;
  //   case 'warning':
  //     messageIcon = <Warning />;
  //     break;
  //   case 'error':
  //     messageIcon = <Cancel />;
  //     break;
  //   default:
  //     messageIcon = '';
  //     break;
  // }

  // return (
  //   <SnackbarContent ref={ref}>
  //     <Box boxShadow={5} className={`${classes[type]} ${classes.rootCustSnack}`}>
  //       <Grid
  //         container
  //         direction="row"
  //         justify="center"
  //         alignItems="center"
  //         className={classes.contanierMargins}
  //       >
  //         <Grid item xs={1} className={classes.contanierSideMargins}>
  //           <Box textAlign="center">{messageIcon}</Box>
  //         </Grid>
  //         <Grid item xs>
  //           <Box>
  //             <Typography variant="button">{title}</Typography>
  //             <Typography className={classes.text}>{message}</Typography>
  //           </Box>
  //         </Grid>
  //         <Grid item xs={2} sm={1} className={classes.contanierSideMargins}>
  //           <Box>
  //             <IconButton onClick={handleDismiss}>
  //               <Clear fontSize="small" className={classes.closeButtonColor} />
  //             </IconButton>
  //           </Box>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </SnackbarContent>
  // );
});

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
};

export default CustomSnackbar;
