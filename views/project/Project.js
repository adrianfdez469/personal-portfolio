import React from 'react';
import { makeStyles, CssBaseline, Container } from '@material-ui/core';
import ProjectHeader from '../../components/UI/Project/ProjectHeader';
import ProjectBody from '../../components/UI/Project/ProjectBody';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0),
    },
  },
}));

const Project = () => {
  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={styles.root}>
        <ProjectHeader />
        <ProjectBody />
      </Container>
    </>
  );
};

export default Project;
