import React from 'react';

import clsx from 'clsx';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
  Avatar,
} from '@material-ui/core';

import { ThumbUpAltOutlined, ShareOutlined, EditOutlined } from '@material-ui/icons';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useProjectBoxStyles } from './styles';

const list = [
  { title: 'Portafolio-Personal', subtitle: 'Javascript', img: '/images/no-image-red-2.png' },
  { title: 'Portafolio-Personal', subtitle: 'Javascript', img: '/images/no-image-red-2.png' },
  { title: 'Portafolio-Personal', subtitle: 'Javascript', img: '/images/no-image-red-2.png' },
  { title: 'Portafolio-Personal', subtitle: 'Javascript', img: '/images/no-image-red-2.png' },
  { title: 'Portafolio-Personal', subtitle: 'Javascript', img: '/images/no-image-red-2.png' },
];

const ProjectBox = (props) => {
  const classes = useProjectBoxStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.box}>
        <div className={classes.gridList}>
          {list.map((element, index) => (
            <div key={index} className={classes.listBox}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      A
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <EditOutlined />
                    </IconButton>
                  }
                  title={element.title}
                  subheader={`Lenguage: ${element.subtitle}`}
                />
                <CardMedia
                  className={classes.media}
                  image={element.img}
                  title="Nombre del proyecto"
                />
                <CardContent>
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Descripción del proyecto. Una pequeña síntesis de en que consiste el proyecto o
                    el mensaje que el usuario quiere hacer llegar.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="">
                    <ThumbUpAltOutlined />
                  </IconButton>
                  <IconButton aria-label="">
                    <ShareOutlined />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      Acá puede ir algunos datos adicionales que quiera poner el usuario como:
                      colaboradores, tecnologías y etc.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
