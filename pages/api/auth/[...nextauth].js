import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import limax from 'limax';
import prisma from '../../../prisma/prisma.instance';

export default (req, res) =>
  NextAuth(req, res, {
    adapter: Adapters.Prisma.Adapter({ prisma }),
    providers: [
      // OAuth authentication providers...
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Providers.LinkedIn({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // Passwordless / email sign in
      Providers.Email({
        server: process.env.MAIL_SERVER,
        from: 'NextAuth.js <no-reply@example.com>',
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
    // Optional SQL or MongoDB database to persist users
    database: `${process.env.POSTGRES_CONNECTION_URI}`,
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      async redirect(url, baseUrl) {
        return baseUrl;
      },
      async session(session, user) {
        const resultSession = { ...session };
        resultSession.slug = user.slug;
        return resultSession;
      },
    },
    events: {
      async createUser(user) {
        if (user && user.id) {
          const time = new Date().getTime();
          let slug = '';
          if (user.name && user.name !== '') {
            slug = `${limax(user.name)}-${time}`;
          } else if (user.email && user.email !== '') {
            const email = user.email.split('@')[0];
            slug = `${limax(email)}-${time}`;
          } else {
            slug = `user-${time}`;
          }

          await prisma.user.update({
            data: {
              slug,
            },
            where: {
              id: user.id,
            },
          });
        }
      },
    },
    secret: process.env.NEXTAUTH_SHA_SECRET,
    // debug: true,
  });
