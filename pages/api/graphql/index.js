import { ApolloServer } from 'apollo-server-micro';
import executableSchema from '../../../backend';

const apolloServer = new ApolloServer({
  schema: executableSchema,
});
const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
