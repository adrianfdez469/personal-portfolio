import { useContext, createContext } from 'react';

export const ProfileContext = createContext();
export const useProfile = () => {
  const profile = useContext(ProfileContext);
  return profile;
};
