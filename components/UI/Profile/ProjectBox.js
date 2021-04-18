import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Card, CardContent, Typography, CardActionArea, Grid } from '@material-ui/core';
import SkillCategoriesConst from '../../../constants/skillsCategorysConst';
import { useProjectBoxStyles } from './styles';

import { useProfile } from '../../../store/contexts/profileContext';
import { useFilterProject } from '../../../store/contexts/filterProjectContext';

const ImageLoader = ({ src }) => src;

const countFilteredSkills = (project, filters) =>
  project.skills.reduce(
    (acum, skill) =>
      filters.findIndex((skillFilter) => skillFilter === skill.name) > -1 ? acum + 1 : acum,
    0
  );

const ProjectBox = (props) => {
  const { edit } = props;
  const styles = useProjectBoxStyles();
  const { user } = useProfile();
  const filterProject = useFilterProject();
  const router = useRouter();
  console.log(router);
  const goProject = (project) => {
    if (edit) {
      router.push(`/profile/${user.id}/projects/${project.id}`);
      return;
    }
    window.open(
      `${window.location.protocol}//${window.location.host}/${user.slug}/${project.projectSlug}`
    );
  };

  return (
    <Grid container spacing={2} className={styles.grid}>
      {user.projects
        .filter((project) =>
          project.skills.some((skill) => {
            if (filterProject && filterProject.skill && filterProject.skill.length > 0) {
              return filterProject.skill.find((skillFilter) => skillFilter === skill.name);
            }
            return true;
          })
        )
        .sort((prevProj, nextProjec) => {
          if (filterProject && filterProject.skill && filterProject.skill.length > 0) {
            return (
              countFilteredSkills(nextProjec, filterProject.skill) -
              countFilteredSkills(prevProj, filterProject.skill)
            );
          }
          return 0;
        })
        .map((element) => (
          <Grid item key={element.id} style={{ padding: '8px 0' }}>
            <Card className={styles.card}>
              <CardActionArea
                style={{ display: 'flex-root', flexDirection: 'column' }}
                onClick={() => goProject(element)}
              >
                <div
                  style={{
                    width: '100%',
                    height: 140,
                    position: 'relative',
                  }}
                >
                  <Image
                    loader={ImageLoader}
                    src={
                      element.images.length > 0
                        ? element.images[0].imageUrl
                        : `/images/no-image-red-2.png`
                    }
                    quality={50}
                    alt="image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
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
