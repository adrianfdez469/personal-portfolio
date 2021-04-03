import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../prisma/prisma.instance';
import { getHashSlug } from '../../../libs/generators';
import ProxyProvider from '../../../libs/integrations/provider.proxy';

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
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
    // Optional SQL or MongoDB database to persist users
    database: `${process.env.POSTGRES_CONNECTION_URI}`,
    session: { jwt: true },
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      async redirect(url) {
        return url;
      },
      async session(session, token) {
        // console.log(' -------------- CALLBACK session');
        // console.log(session);
        // console.log(token);
        const resultSession = { ...session };
        resultSession.accessToken = token.accessToken;
        resultSession.tokenProvider = token.provider;
        resultSession.userId = token.userId;
        return resultSession;
      },
      async jwt(token, user, account /* , profile, isNewUser */) {
        // console.log(' -------------- CALBACK jwt');
        // console.log(token);
        // console.log(user);
        // console.log(account);

        const newToken = token;
        // Add access_token to the token right after signin
        if (account && account.accessToken) {
          newToken.accessToken = account.accessToken;
          newToken.provider = account.provider;
          newToken.userId = user.id;
        }
        return newToken;
      },
    },
    events: {
      async createUser(user) {
        if (user && user.id) {
          let slug = '';
          if (user.name && user.name !== '') {
            slug = getHashSlug(user.name);
          } else if (user.email && user.email !== '') {
            const email = user.email.split('@')[0];
            slug = getHashSlug(email);
          } else {
            slug = getHashSlug();
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
      async signIn(data) {
        const provider = ProxyProvider(data.account.provider);
        if (!provider) {
          return;
        }
        if (!data.isNewUser) {
          provider.deleteEnhanceToken(data.user.id);
          return;
        }
        if (data.account.accessToken && data.account.accessToken !== '') {
          const userProviderData = await provider.getUserDataByToken(data.account.accessToken);
          await prisma.user.update({
            data: {
              name: userProviderData.name,
              email: userProviderData.email,
              image: userProviderData.avatarUrl,
              title: userProviderData.title,
              description: userProviderData.about,
              githubLink: userProviderData.githubUrl,
              linkedinLink: userProviderData.linkedinUrl,
              gitlabLink: userProviderData.gitlabUrl,
              twitterLink: userProviderData.twitterUrl,
              experience: userProviderData.experience,
            },
            where: {
              id: data.user.id,
            },
          });
        }
      },
    },
    secret: process.env.NEXTAUTH_SHA_SECRET,
    // debug: true,
  });
