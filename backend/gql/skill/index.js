import { gql } from 'apollo-server-micro';

export const skillTypeDefs = gql`
  type Skill {
    id: ID!
    name: String!
    category: SkillTypes
  }
`;

export const skillResolver = {};
