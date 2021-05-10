import React from 'react';
import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';
// eslint-disable-next-line import/named
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
    <Container maxWidth="xl" className={styles.root}>
      <PersonData edit={edit} />
      <ProjectBox edit={edit} />
    </Container>
  );
};

Profile.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default Profile;
