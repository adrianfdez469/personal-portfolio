import React, { useState, useEffect } from 'react';

import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { ExitToAppOutlined } from '@material-ui/icons';

import { useRecoilValue, useRecoilState } from 'recoil';
import { atomLocale, atomButtonLanguage } from '../../../store/atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const LogoutButton = (props) => {
  const classes = useStyles();
  const [locale, setLocale] = useRecoilState(atomLocale);
  const language = useRecoilValue(atomButtonLanguage);
  const [title, setTitle] = useState(null);

  // const [title, setTitle] = useState(language.languageButton)

  useEffect(() => {
    if (language) {
      setTitle(language.logoutButton);
    }
  }, [language]);

  const onCLickHandle = () => {};

  return (
    <Tooltip title={title}>
      <IconButton onClick={onCLickHandle}>
        <ExitToAppOutlined className={classes.root} />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
