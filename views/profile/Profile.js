import React from 'react';
import { PersonData, ProjectBox } from '../../components/UI';

const Profile = (props) => {
  const { edit } = props;
  return (
    <>
      <PersonData edit={edit} />
      <ProjectBox />
    </>
  );
};

export default Profile;
