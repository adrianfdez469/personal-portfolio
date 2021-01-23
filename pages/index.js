/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import LandingIntro from '../components/UI/landing/LandingIntro';

export default function myComponent() {
  return (
    <>
      <Image src="/images/1.jpg" layout="fill" objectFit="cover" quality={100} />
      <LandingIntro />
    </>
  );
}
