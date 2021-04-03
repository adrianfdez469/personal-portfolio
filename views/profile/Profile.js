import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';
import { PersonData, ProjectBox } from '../../components/UI';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0),
    },
  },
}));

const Profile = (props) => {
  const { edit } = props;
  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={styles.root}>
        <PersonData edit={edit} />
        <ProjectBox />
      </Container>
    </>
  );
};

Profile.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default Profile;
