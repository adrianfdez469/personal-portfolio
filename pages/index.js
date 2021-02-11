import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Landing from '../views/landing/Landing';

export default function myComponent() {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(session);
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (session && session.slug) {
    router.push(`${router.basePath}/profile/${session.slug}`);
  }

  return (
    <>
      <Landing />
    </>
  );
}
