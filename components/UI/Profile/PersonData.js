import React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider } from '@material-ui/core';

import {
  ShareOutlined,
  FeedbackOutlined,
  Brightness4Outlined,
  ExitToAppOutlined,
  PictureAsPdfOutlined,
  EditOutlined,
} from '@material-ui/icons';

import { AvatarPhoto } from '../Avatar/AvatarPhoto';

const useStyle = makeStyles((theme) => ({
  box: {
    margin: 'auto',
    width: '100vh',
  },
  paper: {
    maxWidth: '95.0rem',
    width: '100%',
    height: '18.5rem',
    margin: 'auto',
  },
  headerTop: {
    width: '100%',
    height: '7.5rem',
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
  },
  headerBotton: {
    width: '100%',
    height: 'min-content',
    maxHeight: '8.0rem',
    marginTop: '-1.5rem',
  },
  headerButton: {
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
  },
  avatar: {
    width: '9.0rem',
    height: '9.0rem',
    margin: '0.0rem 1.5rem 0.0rem 1.5rem',
    borderColor: '#fd9f41',
  },
  avatarBorder: {
    borderRadius: '50%',
    backgroundColor: '#fff',
    width: '10.0rem',
    height: '10.0rem',
    marginLeft: 'auto',
  },
  name: {
    margin: '0.0rem 0.0rem 0.0rem 0.5rem',
    color: theme.palette.background.paper,
  },
  subtitle: {
    margin: '0.0rem 0.0rem 0.0rem 1.0rem',
    color: theme.palette.background.paper,
  },
  role: {
    marginLeft: '10.0rem',
  },
  typography: {
    minWidth: 100,
  },
  skills: {
    margin: '1.5rem',
  },
  buttonBar: {
    marginRight: '0.8rem',
    color: theme.palette.background.paper,
  },
  containerName: {
    maxWidth: '90%',
    height: '6.0rem',
    margin: '1.5rem 0.0rem 0.0rem 0.0rem',
  },
  containerDataLeft: {
    margin: '1.0rem 0.0rem 0.0rem 1.0rem',
    textAlign: 'justify',
  },
  containerDataRight: {
    margin: '1.0rem 0.0rem 0.0rem 0.0rem',
    textAlign: 'justify',
    width: '95%',
  },
  divider: {
    height: '7.0rem',
    width: '1.0',
    margin: '0.7rem 0.0rem 0.0rem 2.0rem ',
  },
}));

const PersonData = () => {
  const classes = useStyle();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            style={{ height: 'min-content' }}
            direction="column"
            src="/images/rejillas11.jpg"
          >
            <Grid item>
              <Grid container className={classes.headerButton} justify="flex-end">
                <Grid item style={{ margin: '0.5rem 1.5rem 0.0rem 1.0rem' }}>
                  <EditOutlined className={classes.buttonBar} />
                  <Brightness4Outlined className={classes.buttonBar} />
                  <ExitToAppOutlined className={classes.buttonBar} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.headerTop}>
                <Grid item xs={1.98}>
                  <Grid container direction="column">
                    <Grid item>
                      <div style={{ margin: '0.0rem 0.5rem 0.0rem 2.0rem' }}>
                        <AvatarPhoto src="/images/jarce78.jpg" size="long" />
                      </div>
                    </Grid>
                    <Grid item>
                      <div style={{ margin: '1.5rem 1.0rem 1.0rem 4.0rem' }}>
                        <ShareOutlined />
                        <FeedbackOutlined style={{ marginLeft: '1.0rem' }} />
                        <PictureAsPdfOutlined style={{ marginLeft: '1.0rem' }} />
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
                          <Typography nowrap className={classes.containerDataLeft}>
                            Ing. en Ciencias Informáticas con más de 10 años de experiencia en el
                            sector. Desarrollador Fullstack. Experiencia en el desarrollo de
                            sistemas embebidos, soluciones de seguridad y asistentes personales.
                            Experiencia en el desarrollo de soluciones con inteligencia artificial.
                          </Typography>
                        </Grid>
                        <Grid item xs={0}>
                          <Divider className={classes.divider} orientation="vertical" />
                        </Grid>
                        <Grid item xs style={{ marginLeft: '2.0rem' }}>
                          <Typography nowrap className={classes.containerDataRight}>
                            C++ - Python - Javascript - Java - Qt - Node - React - Python -
                            Spring-boost Qt - Node - React - Python - Spring-boost
                          </Typography>
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
