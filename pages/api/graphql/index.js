import { ApolloServer } from 'apollo-server-micro';

// import jwt from 'next-auth/jwt';
import { resolvers, typeDefs } from '../../../backend';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  /* context: async ({ req }) => {
    console.log(req);
    const session = await getSession({ req });
   
    // const token = await jwt.getToken({ req, secret: process.env.NEXTAUTH_SHA_SECRET });

  
    return { req };
  }, */
});
const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
