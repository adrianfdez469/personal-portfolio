import React, { useState, useEffect } from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { Language } from '@material-ui/icons';

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

  const onCLicklanguageHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLicklanguageHandle} style={styles}>
        <Language className={withColor && classes.root} />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageButton;
