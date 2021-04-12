import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardActionArea,
  Grid,
} from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import OptimizedAvatar from '../Avatar/OptimizedAvatar';
import SkillCategoriesConst from '../../../constants/skillsCategorysConst';
import { useProjectBoxStyles } from './styles';

import { useProfile } from '../../../store/contexts/profileContext';

const ProjectBox = (props) => {
  const { edit } = props;
  const styles = useProjectBoxStyles();
  const { user } = useProfile();
  return (
    <Grid container spacing={2} justify="center" className={styles.grid}>
      {user.projects.map((element) => (
        <Grid item key={element.id}>
          <Card className={styles.card}>
            <CardActionArea style={{ height: 'fit-content' }}>
              <CardHeader
                avatar={
                  <OptimizedAvatar
                    aria-label="recipe"
                    className={!element.logoUrl ? styles.avatar : ''}
                    src={element.logoUrl}
                    width={40}
                    height={40}
                    alt={element.name}
                  >
                    {element.name[0].toUpperCase()}
                  </OptimizedAvatar>
                }
                title={element.name}
                subheader={`${element.skills
                  .filter((skill) => skill.category === SkillCategoriesConst.PROG_LANG)
                  .map((skill) => skill.name)
                  .join(' - ')}`}
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
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton aria-label="">
                <PhotoLibraryIcon />
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

ProjectBox.propTypes = {
  edit: PropTypes.bool.isRequired,
};
export default ProjectBox;
