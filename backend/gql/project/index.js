import { gql } from 'apollo-server-micro';

// eslint-disable-next-line import/prefer-default-export
export const projectTypeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String
    fechaIni: Date
    fechaFin: Date
    languages: [Skill!]
    technologies: [Skill!]
    projectLink: Link
    projectDevLink: Link
    otherInfo: String
  }
`;
/*
export const projectResolvers = {
  Project: {
    id: (project) => project.id,
     languages: () => [
      { id: '123', name: 'JavaScript' },
      { id: '124', name: 'HTML5' },
      { id: '125', name: 'CSS3' },
    ],
    technologies: () => [
      { id: '564', name: 'ReactJs' },
      { id: '895', name: 'NodeJs' },
      { id: '9951', name: 'Express' },
      { id: '6589', name: 'React Hooks' },
    ],
    projectLink: () => ({
      id: '5234',
      link: 'https://adrianfdez469.github.io/chat_front',
      title: 'ShutApp',
      description: 'App de Chat',
      imageUrl: '',
    }),
    projectDevLink: () => ({
      id: '5234',
      link: 'https://github.com/adrianfdez469/chat_front',
      title: 'ShutApp',
      description: 'App de Chat',
      imageUrl: '',
    }),
    images: () => [
      { id: '5162', url: '' },
      { id: '5162', url: '' },
      { id: '5162', url: '' },
    ], 
  },
}; */
