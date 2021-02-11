import { makeExecutableSchema } from 'apollo-server-micro';
import { resolvers, typeDefs } from './common';
import { userResolvers, userTypeDefs } from './user';
import { projectTypeDefs } from './project';
import { linkResolvers, linkTypeDefs } from './link';
import { skillResolver, skillTypeDefs } from './skill';

const resolver = Object.assign(
  resolvers,
  userResolvers,
  // projectResolvers,
  linkResolvers,
  skillResolver
);

const executableSchema = makeExecutableSchema({
  typeDefs: [typeDefs, userTypeDefs, projectTypeDefs, linkTypeDefs, skillTypeDefs],
  resolvers: resolver,
});

export default executableSchema;
