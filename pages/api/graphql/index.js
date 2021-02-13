import { ApolloServer } from 'apollo-server-micro';
import { resolvers, typeDefs } from '../../../backend';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
