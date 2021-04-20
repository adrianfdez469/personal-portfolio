import { ApolloServer } from 'apollo-server-micro';
// import { PrismaClient } from '@prisma/client';
import prisma from '../../../prisma/prisma.instance';
// import jwt from 'next-auth/jwt';
import { resolvers, typeDefs } from '../../../backend';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, prisma }),
});
const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
