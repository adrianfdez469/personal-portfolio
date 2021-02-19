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
  const classes = useStyles();
  const [locale, setLocale] = useRecoilState(atomLocale);
  const language = useRecoilValue(atomButtonLanguage);
  const [title, setTitle] = useState(null);

  // const [title, setTitle] = useState(language.languageButton)

  useEffect(() => {
    if (language) {
      console.log('>>>>>>>>>>>>', language.languageButton);
      setTitle(language.languageButton);
    }
  }, [language]);

  const onCLicklanguageHandle = () => {
    locale === 'es' ? setLocale('en') : setLocale('es');
  };

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLicklanguageHandle}>
        <Language className={classes.root} />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageButton;
