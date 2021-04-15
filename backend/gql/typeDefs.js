import { gql } from 'apollo-server-micro';
import skillsCategories from '../../constants/skillsCategorysConst';

const types = Object.values(skillsCategories).reduce((reducer, value) => `${reducer} ${value}`, '');

const typeDefs = gql`
  scalar Date

  enum SkillTypes {
    ${types}
  }

  type Link {
    url: String!
    title: String!
    description: String!
    imageUrl: String!
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
    projectLink: String
    projectDevLink: String
    otherInfo: String
    images: [Image!]
    logoUrl: String
    collaborators: [Collaborator!]
    slug: String
    projectSlug: String
  }

  type User {
    id: ID!
    name: String
    email: String
    image: String
    slug: String!
    title: String
    description: String
    theme: String
    projects: [Project]
    publicProfile: Boolean
    twitterLink: String
    linkedinLink: String
    githubLink: String
    gitlabLink: String
    experience: Int
    phone: String
    gender: gender
    birthday: Date
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

  type Collaborator {
    login: String!
    avatarUrl: String
    email: String
    bio: String
    name: String
    url: String
    isOwner: Boolean
  }

  input CollaboratorParams {
    login: String
    avatarUrl: String
    email: String
    bio: String
    name: String
    url: String
    isOwner: Boolean!
  }
  
  input ProjectParams {
    # userId: ID
    name: String!
    description: String
    initialDate: String
    finalDate: String
    skills: [SkillParams!]
    projectLink: String
    projectDevLink: String
    logoUrl: String
    otherInfo: String
    collaborators: [CollaboratorParams!] 
    images: [String!]
  }


  input UserParams {
    name: String
    email: String
    image: String
    slug: String
    title: String
    description: String
    theme: String
    publicProfile: Boolean
    twitterLink: String
    linkedinLink: String
    githubLink: String
    gitlabLink: String
    experience: Int
    phone: String
    gender: gender
    birthday: String
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
    topics: [String!]
    collaborators: [Collaborator!]
    totalCollaborators: String
    isPrivate: Boolean
    provider: devProviders,
  }
  type ProvidersResposResponse {
    scopes: String
    repos: [DevProviderRepo!]
  }
  type ProviderUser {
    avatarUrl: String
    name: String
    title: String
    about: String
    birthday: String
    experience: Int
    gender: gender
    email: String
    phone: String
    provider: userProviders
    githubUrl: String
    gitlabUrl: String
    linkedinUrl: String
    twitterUrl: String
  }

  type Mutation {
    updateUser(userId: ID!, user: UserParams!): updateUserMutationResponse!
    createSkill(name: String!, category: SkillTypes): CreateSkillMutationResponse!
    saveProject(projectId: ID, project: ProjectParams!): SaveProjectMutationResponse!

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
  enum userProviders {
    github
    gitlab
    linkedin
  }
  enum gender {
    male
    female
  }

  type Query {
    #users(id: IntComparer, slug: StringComparer, email: StringComparer): [User!]
    user(id: ID!): User!
    userBySlug(slug: String!): User
    projects(id: IntComparer, name: StringComparer): [Project!]
    projectBySlug(projectSlug: String!): Project
    skills(id: IntComparer, name: StringComparer, category: SkillTypes): [Skill!]
    link(url: String): Link!

    providerRepos(provider: devProviders!): ProvidersResposResponse!
    providerRepoData(provider: devProviders!, id: ID!): DevProviderRepo!
    providerUserData(provider: userProviders!): ProviderUser!

  }
`;

export default typeDefs;
