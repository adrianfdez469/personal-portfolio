import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// https://personal-portfolio-a156a.firebaseapp.com/__/auth/handler
const options = {
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
  // database: process.env.DATABASE_URL
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    jwt: async (token) => Promise.resolve(token),
  },
  secret: process.env.NEXTAUTH_SHA_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
