import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Divider, IconButton, Tooltip } from '@material-ui/core';

import {
  ShareOutlined,
  FeedbackOutlined,
  Brightness4Outlined,
  ExitToAppOutlined,
  PictureAsPdfOutlined,
  EditOutlined,
  PostAddOutlined,
} from '@material-ui/icons';

import { useRecoilValue, useRecoilState } from 'recoil';
import { atomLocale, atomButtonLanguage } from '../../../store/atoms';

import AvatarPhoto from '../Avatar/AvatarPhoto';
import {
  AddProjectButton,
  LanguageButton,
  ThemeButton,
  FeedbackButton,
  LogoutButton,
  EditProfileButton,
  SharedButton,
} from '..';

import { usePersonDataStyles } from './styles';

const PersonData = (props) => {
  const { edit } = props;
  const classes = usePersonDataStyles();
  const language = useRecoilValue(atomButtonLanguage);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (language) {
      setTitle(language);
    }
  }, [language]);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container style={{ height: 'min-content' }} direction="column">
            <Grid item>
              <Grid container className={classes.headerButton} justify="flex-end">
                <Grid item style={{ margin: '0.5rem 1.5rem 0.0rem 1.0rem' }}>
                  <LanguageButton />
                  <ThemeButton />
                  {edit ? <FeedbackButton /> : ''}
                  {edit ? <LogoutButton /> : ''}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.headerTop}>
                <Grid item xs={2}>
                  <Grid container direction="column">
                    <Grid item>
                      <div style={{ margin: '0.0rem 0.5rem 0.0rem 2.0rem' }}>
                        <AvatarPhoto src="/static/images/jarce78.jpg" size="long" />
                      </div>
                    </Grid>
                    <Grid item>
                      <div style={{ margin: '0.5rem 1.0rem 1.0rem 2.5rem' }}>
                        {edit ? <EditProfileButton /> : ''}
                        {edit ? <AddProjectButton /> : ''}
                        {edit ? <SharedButton /> : ''}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid container direction="column" spacing={3}>
                    <Grid item xs className={classes.containerName}>
                      <Grid container>
                        <Grid item xs>
                          <Typography variant="h3" className={classes.name}>
                            Jorge Arce Martínez
                          </Typography>
                          <Typography variant="subtitle1" className={classes.subtitle}>
                            Full-Stack Software Developer
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container wrap="nowrap" spacing={0}>
                        <Grid item xs>
                          <Typography className={classes.containerDataLeft} />
                        </Grid>
                        <Grid item>
                          <Divider className={classes.divider} orientation="vertical" />
                        </Grid>
                        <Grid item xs style={{ marginLeft: '2.0rem' }}>
                          <Typography className={classes.containerDataRight} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default PersonData;
