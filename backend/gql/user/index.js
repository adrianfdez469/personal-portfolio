import { gql } from 'apollo-server-micro';
import prisma from '../../../prisma/prisma.instance';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    image: String
    slug: String!
    title: String
    description: String
    projects: [Project]
  }

  type createUserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type Query {
    getUserBySlug(slug: String!): User
    getUserById(id: ID!): User
  }

  input mutableUser {
    name: String
    email: String
    image: String
    slug: String
    title: String
    description: String
  }

  type Mutation {
    updateUser(id: ID!, user: mutableUser!): createUserMutationResponse!
  }
`;

export const userResolvers = {
  Mutation: {
    updateUser: (parent, args) => {
      const { id, user } = args;

      return prisma.user
        .update({
          where: {
            id: +id,
          },
          data: { ...user },
        })
        .then((updatedUser) => ({
          code: 200,
          success: true,
          message: 'USER_UPDATED',
          user: updatedUser,
        }))
        .catch((err) => {
          console.log(err);
          return {
            code: 500,
            success: false,
            message: 'ERROR',
            user,
          };
        });
    },
  },
  Query: {
    getUserBySlug: (parent, { slug }) =>
      prisma.user
        .findUnique({
          where: {
            slug,
          },
        })
        .catch((err) => {
          console.log(err);
          return null;
        }),
    getUserById: (parent, { id }) =>
      prisma.user
        .findUnique({
          where: {
            id: +id,
          },
        })
        .catch((err) => {
          console.log(err);
          return null;
        }),
  },
  User: {
    /* projects: (user, args, context) => {
      const resp = context.loader.projects.load(user.id);
      return resp;
    }, */
    projects: async () => [],
  },
};
