import React, { useState, useEffect } from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { ShareOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const SharedButton = (props) => {
  const { title } = props;
  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle}>
        <ShareOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default SharedButton;
