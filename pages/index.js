/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

export default function myComponent() {
  const [session /* , loading */] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in
          <br />
          <Link href="/auth/signin?callbackUrl=http://localhost:3000/">
            <a>Signin</a>
          </Link>
          {/* <button onClick={signIn} type="button">
            Sign in
          </button> */}
        </>
      )}
      {session && (
        <>
          Signed in as
          {`${session.user.name} ${session.user.email}`}
          <br />
          <button onClick={signOut} type="button">
            Sign out
          </button>
        </>
      )}
    </>
  );
}
