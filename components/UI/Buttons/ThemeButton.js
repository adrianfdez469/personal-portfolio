import React from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { Brightness4Outlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const LanguageButton = (props) => {
  const { withColor, styles, title } = props;
  const classes = useStyles();

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle} style={styles}>
        <Brightness4Outlined className={withColor && classes.root} />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageButton;
