import React from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const EditProfileButton = (props) => {
  const { title } = props;

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle}>
        <EditOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default EditProfileButton;
