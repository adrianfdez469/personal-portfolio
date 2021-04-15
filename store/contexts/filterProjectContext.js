import React, { useReducer, useContext, createContext } from 'react';

const FilterProjectContext = createContext();

const actions = {
  ADD_FILTER: 'ADD_FILTER',
  REMOVE_FILTER: 'REMOVE_FILTER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_FILTER:
      return {
        ...state,
        [action.field]: [...(state[action.field] ? state[action.field] : []), action.data],
      };
    case actions.REMOVE_FILTER:
      return {
        ...state,
        [action.field]: [...state[action.field]].filter((el) => el !== action.data),
      };
    default:
      return state;
  }
};

const FilterProjectProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, value } = props;
  const [state, dispatch] = useReducer(reducer, value);

  const addFilter = (field, data) => {
    dispatch({ type: actions.ADD_FILTER, field, data });
  };
  const removeFilter = (field, data) => {
    dispatch({ type: actions.REMOVE_FILTER, field, data });
  };

  return (
    <FilterProjectContext.Provider value={{ state, change: { addFilter, removeFilter } }}>
      {children}
    </FilterProjectContext.Provider>
  );
};

export const useFilterProject = () => {
  const { state } = useContext(FilterProjectContext);
  return state;
};
export const useChangeFilterProject = () => {
  const { change } = useContext(FilterProjectContext);
  return change;
};

export default FilterProjectProvider;
