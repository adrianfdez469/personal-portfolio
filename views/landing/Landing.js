import React from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { LandingIntro, LandingFeatures, LandingAbout, LandingFooter } from '../../components/UI';
import useStyles from './styles';
import Backdrop from '../../components/UI/backdrop';

const Landing = () => {
  const classes = useStyles();
  const [session] = useSession();
  const [routing, setRounting] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      if (session.userId) {
        setRounting(true);
        router.replace(
          `${window.location.protocol}//${window.location.host}/profile/${session.userId}`
        );
      }
    }
  }, [session]);

  return (
    <>
      <div className={classes.back}>
        <LandingIntro />
        <LandingFeatures />
        <LandingAbout />
        <LandingFooter />
      </div>
      <Backdrop open={routing} />
    </>
  );
};
export default Landing;
