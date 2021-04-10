import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from '@material-ui/core';
import { ThumbUpAltOutlined, ShareOutlined, EditOutlined } from '@material-ui/icons';
import OptimizedAvatar from '../Avatar/OptimizedAvatar';
import SkillCategoriesConst from '../../../constants/skillsCategorysConst';
import { useProjectBoxStyles } from './styles';

import { useProfile } from '../../../store/contexts/profileContext';

const ProjectBox = () => {
  const styles = useProjectBoxStyles();
  const { user } = useProfile();

  return (
    <Grid container spacing={2} justify="center" className={styles.grid}>
      {user.projects.map((element) => (
        <Grid item key={element.id}>
          <Card className={styles.card}>
            <CardHeader
              avatar={
                <OptimizedAvatar
                  aria-label="recipe"
                  className={!element.logoUrl ? styles.avatar : ''}
                  src={element.logoUrl}
                  width={40}
                  height={40}
                >
                  {element.name[0].toUpperCase()}
                </OptimizedAvatar>
              }
              action={
                <IconButton aria-label="settings">
                  <EditOutlined />
                </IconButton>
              }
              title={element.name}
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
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectBox;
