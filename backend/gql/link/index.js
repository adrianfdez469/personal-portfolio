import { gql } from 'apollo-server-micro';

export const linkTypeDefs = gql`
  type Link {
    id: ID!
    link: String!
    title: String!
    description: String!
    imageUrl: String!
  }
`;

export const linkResolvers = {};
