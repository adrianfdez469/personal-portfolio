import React from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Cancel, CheckCircle, Clear, Info, Warning } from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from './styles';

const CustomSnackbar = React.forwardRef(({ title, message, type, id }, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const handleDismiss = () => {
    closeSnackbar(id);
  };

  let messageIcon = '';
  switch (type) {
    case 'info':
      messageIcon = <Info />;
      break;
    case 'success':
      messageIcon = <CheckCircle />;
      break;
    case 'warning':
      messageIcon = <Warning />;
      break;
    case 'error':
      messageIcon = <Cancel />;
      break;
    default:
      messageIcon = '';
      break;
  }

  return (
    <SnackbarContent ref={ref}>
      <Box boxShadow={5} className={`${classes[type]} ${classes.rootCustSnack}`}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.contanierMargins}
        >
          <Grid item xs={1} className={classes.contanierSideMargins}>
            <Box textAlign="center">{messageIcon}</Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography variant="button">{title}</Typography>
              <Typography className={classes.text}>{message}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={1} className={classes.contanierSideMargins}>
            <Box>
              <IconButton onClick={handleDismiss}>
                <Clear fontSize="small" className={classes.closeButtonColor} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SnackbarContent>
  );
});

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
};

export default CustomSnackbar;
