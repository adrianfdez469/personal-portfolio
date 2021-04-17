import { useContext, createContext } from 'react';

export const ProjectContext = createContext();
export const useProjectContext = () => {
  const project = useContext(ProjectContext);
  return project;
};
