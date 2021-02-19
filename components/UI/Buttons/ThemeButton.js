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
  const classes = useStyles();
  const [locale, setLocale] = useRecoilState(atomLocale);
  const language = useRecoilValue(atomButtonLanguage);
  const [title, setTitle] = useState(null);

  // const [title, setTitle] = useState(language.languageButton)

  useEffect(() => {
    if (language) {
      setTitle(language.themeButton);
    }
  }, [language]);

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle}>
        <Brightness4Outlined className={classes.root} />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageButton;
