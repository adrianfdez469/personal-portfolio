import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Card, CardContent, Typography, CardActionArea, Grid } from '@material-ui/core';
import SkillCategoriesConst from '../../../constants/skillsCategorysConst';
import { useProjectBoxStyles } from './styles';

import { useProfile } from '../../../store/contexts/profileContext';

const ImageLoader = ({ src }) => src;

const ProjectBox = (props) => {
  const { edit } = props;
  const styles = useProjectBoxStyles();
  const { user } = useProfile();
  const router = useRouter();

  const goProject = (project) => {
    if (edit) {
      router.push(`/profile/${user.id}/projects/${project.id}`);
      return;
    }
    router.push(`/${user.slug}/${project.projectSlug}`);
  };

  return (
    <Grid container spacing={2} justify="center" className={styles.grid}>
      {user.projects.map((element) => (
        <Grid item key={element.id}>
          <Card className={styles.card}>
            <CardActionArea
              style={{ display: 'flex-root', flexDirection: 'column' }}
              onClick={() => goProject(element)}
            >
              <Image
                loader={ImageLoader}
                src={element.images[0] || `/images/no-image-red-2.png`}
                width={304}
                height={140}
                quality={50}
                alt="image"
                layout="intrinsic"
                objectFit="cover"
              />
              <CardContent>
                <Typography variant="h5">{element.name}</Typography>
                <Typography className={styles.skills} variant="caption" color="primary">
                  {element.skills
                    .filter((skill) => skill.category === SkillCategoriesConst.PROG_LANG)
                    .map((skill) => skill.name)
                    .join(' - ')}
                </Typography>
                <Typography
                  className={styles.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {element.description}
                </Typography>

                <Typography className={styles.skills} variant="caption" color="secondary">
                  {element.skills
                    .filter((skill) => skill.category === SkillCategoriesConst.PROG_TECH)
                    .map((skill) => skill.name)
                    .join(' - ')}
                </Typography>
              </CardContent>
            </CardActionArea>
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
