import React from 'react';
import { Card, CardContent, CardActionArea } from '@material-ui/core';
import { useProjectContext } from '../../../store/contexts/projectContext';
import LinkPreview from '../LinkPreview';
import { useBodyStyles } from './styles';

const CardProjectLink = ({ url }) => {
  const styles = useBodyStyles();
  if (!url || url === '') return null;
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardContent>
          <LinkPreview url={url} showTextField={false} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ProjectBody = () => {
  const styles = useBodyStyles();
  const project = useProjectContext();

  return (
    <div className={styles.root}>
      <CardProjectLink url={project.projectLink} />
      <CardProjectLink url={project.projectDevLink} />
    </div>
  );
};

export default ProjectBody;
