/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orangeDark } from '../../themes';

const ThemeDispatchContext = React.createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(orangeDark);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeDispatchContext.Provider value={setTheme}>{children}</ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

export const useChangeTheme = () => {
  const setTheme = React.useContext(ThemeDispatchContext);
  const changeTheme = (theme) => setTheme(theme);
  return changeTheme;
};
