import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  box: {
    margin: 'auto',
    display: 'flex',
    maxWidth: '115.0rem',
  },
  addCircle: {
    fontSize: '2.0rem',
    color: '#fd9f41',
  },
  divider: {
    maxWidth: '95.0rem',
    background:
      'linear-gradient(90deg, rgba(191,123,53,1) 0%, rgba(255,145,0,1) 50%, rgba(201,127,51,1) 100%)',
    height: '0.30rem',
    width: '100%',
    border: 0,
    marginTop: '1.6rem',
  },
}));

const AddProject = () => {
  const classes = useStyle();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.box}>
          <hr className={classes.divider} />
        </div>
      </div>
    </>
  );
};

export default AddProject;
