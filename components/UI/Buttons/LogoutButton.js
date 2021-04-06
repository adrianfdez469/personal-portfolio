import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { ExitToAppOutlined } from '@material-ui/icons';
import { signOut } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const LogoutButton = (props) => {
  const { withColor, styles, title } = props;
  const classes = useStyles();

  const onCLickHandle = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle} style={styles}>
        <ExitToAppOutlined className={withColor ? classes.root : ''} />
      </IconButton>
    </Tooltip>
  );
};

LogoutButton.propTypes = {
  withColor: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.any,
  title: PropTypes.string.isRequired,
};
LogoutButton.defaultProps = {
  withColor: false,
  styles: null,
};

export default LogoutButton;
