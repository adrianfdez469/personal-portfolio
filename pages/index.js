import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function myComponent() {
  const [session /* , loading */] = useSession();
  return (
    <>
      {!session && (
        <>
          Not signed in
          <br />
          <button onClick={signIn} type="button">
            Sign in
          </button>
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
