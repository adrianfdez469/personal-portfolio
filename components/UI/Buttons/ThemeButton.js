import React, { useState, useEffect } from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { Brightness4Outlined } from '@material-ui/icons';

import { useRecoilValue, useRecoilState } from 'recoil';
import { atomLocale, atomButtonLanguage } from '../../../store/atoms';

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
