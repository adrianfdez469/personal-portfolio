import { gql } from 'apollo-server-micro';
import skillsCategories from '../../../constants/skillsCategorysConst';

const types = Object.values(skillsCategories).reduce((reducer, value) => `${reducer} ${value}`, '');

export const typeDefs = gql`
  scalar Date

  enum SkillTypes {
    ${types}
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

`;

export const resolvers = {
  MutationResponse: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType() {
      return null;
    },
  },
};
