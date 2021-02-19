import React from 'react';
import Landing from '../views/landing/Landing';

export const getStaticProps = async (context) => {
  const { locale } = context;
  const path = "../i18n/locales/";

  const lang = locale === 'es' ? await(await import(`../i18n/locales/es/common.json`)):await(await import(`../i18n/locales/en/common.json`))

  return {
    props: {
      locale: lang.landing,
    },
  };
};

export default function myComponent(props) {
  return (
    <>
      <Landing locale = {props.locale}/>
    </>
  );
}
