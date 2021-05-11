import React from 'react';
import { Chip } from '@material-ui/core';
import HeaderTemplate from '../HeaderTemplate';
import { useProjectContext } from '../../../store/contexts/projectContext';
import skillCategories from '../../../constants/skillsCategorysConst';
// import { useHeaderStyles } from './styles';

const ProjectHeader = () => {
  // const styles = useHeaderStyles();
  const project = useProjectContext();

  return (
    <>
      <HeaderTemplate
        headerTitle={project.name}
        description={project.description}
        DesciptionLowAreaCmp={
          <div>
            {project.skills
              .sort((prev) => (prev.category === skillCategories.PROG_LANG ? -1 : 1))
              .map((skill) => (
                <Chip
                  key={skill.name}
                  variant="outlined"
                  size="small"
                  color={skill.category === skillCategories.PROG_LANG ? 'primary' : 'secondary'}
                  label={skill.name}
                  style={{ margin: 4 }}
                />
              ))}
          </div>
        }
      />
    </>
  );
};

export default ProjectHeader;
