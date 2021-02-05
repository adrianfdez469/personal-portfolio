import React from 'react';
import { RecoilRoot } from 'recoil';

import { Profile } from '../../views';

export const getStaticProps = (context) => {
  const { locale } = context;
  const path = '/static/locales/';

  return {
    props: {
      locale: locale === 'es' ? `${path}es` : `${path}en`,
    },
  };
};

const Sign = (props) => (
  <RecoilRoot>
    <Profile locale={props} />
  </RecoilRoot>
);

export default Sign;
