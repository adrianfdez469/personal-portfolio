import React, { useState } from 'react';

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

import SkillCategoriesConst from '../../../constants/skillsCategorysConst';
import { useProjectBoxStyles } from './styles';

import { useProfile } from '../../../store/contexts/profileContext';

const ProjectBox = () => {
  const styles = useProjectBoxStyles();
  const [expanded, setExpanded] = useState(false);
  const { user } = useProfile();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.gridList}>
          {user.projects.map((element) => (
            <div key={element.id} className={styles.listBox}>
              <Card className={styles.card}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={!element.logoUrl && styles.avatar}
                      src={element.logoUrl}
                    >
                      {element.name[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <EditOutlined />
                    </IconButton>
                  }
                  title={element.name}
                  // subheader={`Lenguage: ${element.subtitle}`}
                  subheader={`${element.skills
                    .filter((skill) => skill.category === SkillCategoriesConst.PROG_LANG)
                    .map((skill) => skill.name)
                    .join(' - ')}`}
                />
                <CardMedia
                  className={styles.media}
                  image={
                    element.images && element.images.length > 0
                      ? element.images[0].imageUrl
                      : '/images/no-image-red-2.png'
                  }
                  title={element.name}
                />
                <CardContent>
                  <Typography
                    className={styles.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {element.description}
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
                    className={clsx(styles.expand, { [styles.expandOpen]: expanded })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{element.otherInfo}</Typography>
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
