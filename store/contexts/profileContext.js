import React, { useContext, createContext, useReducer } from 'react';
import FilterProjectProvider from './filterProjectContext';

const ProfileContext = createContext();

const actions = {
  CHANGE_PROVIDER_DATA: 'CHANGE_PROVIDER_DATA',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_PROVIDER_DATA:
      return {
        user: {
          ...state.user,
          ...action.data,
        },
      };
    default:
      return state;
  }
};

const ProfileProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, value } = props;
  const [state, dispatch] = useReducer(reducer, value);

  const changeProviderData = (data) => {
    dispatch({ type: actions.CHANGE_PROVIDER_DATA, data });
  };

  return (
    <ProfileContext.Provider value={[state, changeProviderData]}>
      <FilterProjectProvider value={{}}>{children}</FilterProjectProvider>
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const [state] = useContext(ProfileContext);
  return state;
};
export const useChangeProfile = () => {
  const changeProfile = useContext(ProfileContext)[1];
  return changeProfile;
};

export default ProfileProvider;
