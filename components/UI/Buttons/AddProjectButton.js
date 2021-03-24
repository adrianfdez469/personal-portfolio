import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { PostAddOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const AddProjectButton = (props) => {
  const { withColor, title, styles } = props;
  const classes = useStyles();

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle} style={styles}>
        <PostAddOutlined className={withColor && classes.root} />
      </IconButton>
    </Tooltip>
  );
};

AddProjectButton.propTypes = {
  withColor: PropTypes.bool,
  styles: PropTypes.shape(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};
AddProjectButton.defaultProps = {
  withColor: false,
};

export default AddProjectButton;
