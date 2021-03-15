import { useContext, createContext } from 'react';

export const LangContext = createContext();
export const useLang = () => {
  const language = useContext(LangContext);
  return language;
};
