import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { FeedbackOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const FeedbackButton = (props) => {
  const { withColor, styles, title } = props;
  const classes = useStyles();

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle} style={styles}>
        <FeedbackOutlined className={withColor ? classes.root : ''} />
      </IconButton>
    </Tooltip>
  );
};

FeedbackButton.propTypes = {
  withColor: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.any,
  title: PropTypes.string.isRequired,
};
FeedbackButton.defaultProps = {
  withColor: false,
  styles: null,
};

export default FeedbackButton;
