import React from 'react';
import { LandingIntro, LandingFeatures, LandingAbout, LandingFooter } from '../../components/UI';
import useStyles from './styles';

const Landing = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.back}>
        <LandingIntro />
        <LandingFeatures />
        <LandingAbout />
        <LandingFooter />
      </div>
    </>
  );
};
export default Landing;
