import { gql } from 'apollo-server-micro';
import skillsCategories from '../../constants/skillsCategorysConst';

const types = Object.values(skillsCategories).reduce((reducer, value) => `${reducer} ${value}`, '');

const typeDefs = gql`
  scalar Date

  enum SkillTypes {
    ${types}
  }

  type Link {
    id: ID!
    url: String!
    title: String
    description: String
    imageUrl: String
  }
  type Skill {
    id: ID!
    name: String!
    category: SkillTypes
  }
  type Image {
    id: ID!
    imageUrl: String!
  }
  type Project {
    id: ID!
    name: String!
    description: String
    initialDate: Date
    finalDate: Date
    skills: [Skill!]
    projectLink: Link
    projectDevLink: Link
    otherInfo: String
    images: [Image!]
  }
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

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  type CreateSkillMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    skill: Skill
  }
  type SaveProjectMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    project: Project
  }
  type updateUserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  input SkillParams {
    id: ID
    name: String
    category: SkillTypes
  }
  input LinkParams {
    url: String!
    title: String
    description: String
    imageUrl: String
  }
  input ProjectParams {
    userId: ID
    name: String!
    description: String
    initialDate: String
    finalDate: String
    skills: [SkillParams!]
    projectLink: LinkParams
    projectDevLink: LinkParams
    otherInfo: String
    imageIds: [ID!]
  }
  input UserParams {
    name: String
    email: String
    image: String
    slug: String
    title: String
    description: String
  }

  type Collaborator {
    login: String!
    avatarUrl: String
    email: String
    bio: String
    name: String
    url: String
    isOwner: Boolean
  }
  type DevProviderRepo {
    id: ID!
    name: String!
    description: String
    createdAt: String
    nameWithOwner: String
    ownerId: ID!
    ownerLogin: String
    ownerAvatarUrl: String
    url: String
    deploymentUrl: String
    languages: [String!]
    collaborators: [Collaborator!]
    totalCollaborators: String
    provider: devProviders!
  }
  

  type Mutation {
    updateUser(userId: ID!, user: UserParams!): updateUserMutationResponse!
    createSkill(name: String!, category: SkillTypes): CreateSkillMutationResponse!
    createProject(project: ProjectParams!): SaveProjectMutationResponse!
    updateProject(projectId: ID!, project: ProjectParams!): SaveProjectMutationResponse!
  }

  enum CamelMode {
    default
    insensitive
  }

  input StringComparer {
    equals: String
    contains: String
    endsWith: String
    startsWith: String
    gt: String
    gte: String
    in: [String]
    lt: String
    lte: String
    mode: CamelMode
    not: String
    notIn: [String]
  }

  input IntComparer {
    equals: Int
    gt: Int
    gte: Int
    lt: Int
    lte: Int
    in: [Int]
    not: Int 
    notInt: [Int]
  }
  
  enum devProviders {
    github
    gitlab
  }

  type Query {
    #users(id: IntComparer, slug: StringComparer, email: StringComparer): [User!]
    projects(id: IntComparer, name: StringComparer): [Project!]
    skills(id: IntComparer, name: StringComparer, category: SkillTypes): [Skill!]
    link(url: String): Link!

    providerRepos(provider: devProviders!): [DevProviderRepo!]
    providerRepoData(provider: devProviders!, id: ID!): DevProviderRepo!
  }
`;

export default typeDefs;
