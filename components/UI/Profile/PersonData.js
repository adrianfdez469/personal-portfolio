import React from 'react';
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

import AvatarPhoto from '../Avatar/AvatarPhoto';
import { usePersonDataStyles } from './styles';

const PersonData = () => {
  const classes = usePersonDataStyles();

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
                  <Tooltip title="Editar Perfil">
                    <IconButton>
                      <EditOutlined className={classes.buttonBar} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Notificar Problemas">
                    <IconButton>
                      <FeedbackOutlined className={classes.buttonBar} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cambiar Tema">
                    <IconButton>
                      <Brightness4Outlined className={classes.buttonBar} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Salir">
                    <IconButton>
                      <ExitToAppOutlined className={classes.buttonBar} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className={classes.headerTop}>
                <Grid item xs={2}>
                  <Grid container direction="column">
                    <Grid item>
                      <div style={{ margin: '0.0rem 0.5rem 0.0rem 2.0rem' }}>
                        <AvatarPhoto src="/images/jarce78.jpg" size="long" />
                      </div>
                    </Grid>
                    <Grid item>
                      <div style={{ margin: '0.5rem 1.0rem 1.0rem 4.0rem' }}>
                        <Tooltip title="Compartir Portafolio">
                          <IconButton>
                            <ShareOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Adicionar Proyecto">
                          <IconButton>
                            <PostAddOutlined />
                          </IconButton>
                        </Tooltip>
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
                          <Typography className={classes.containerDataLeft}>
                            Ing. en Ciencias Informáticas con más de 10 años de experiencia en el
                            sector. Desarrollador Fullstack. Experiencia en el desarrollo de
                            sistemas embebidos, soluciones de seguridad y asistentes personales.
                            Experiencia en el desarrollo de soluciones con inteligencia artificial.
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Divider className={classes.divider} orientation="vertical" />
                        </Grid>
                        <Grid item xs style={{ marginLeft: '2.0rem' }}>
                          <Typography className={classes.containerDataRight}>
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
