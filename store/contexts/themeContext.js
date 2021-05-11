/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = {
  palette: {
    primary: {
      main: '#ff9100',
    },
    secondary: {
      main: '#1985ff',
    },
    error: {
      main: '#ff1744',
    },
    type: 'dark',
  },
};

const ThemeDispatchContext = React.createContext(null);

const getMuiTheme = (themeData) => {
  if (typeof themeData === 'string') {
    const muitheme = JSON.parse(themeData);
    if (typeof muitheme !== 'object') {
      return createMuiTheme(JSON.parse(muitheme));
    }
    return createMuiTheme(muitheme);
  }
  if (typeof themeData === 'object') {
    return createMuiTheme(themeData);
  }
  return createMuiTheme(defaultTheme);
};

const ThemeProvider = ({ children, loadedTheme }) => {
  const [theme, setTheme] = React.useState(getMuiTheme(loadedTheme));

  const switchTheme = (themeData) => {
    setTheme(getMuiTheme(themeData));
  };

  return (
    <ThemeDispatchContext.Provider value={switchTheme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeDispatchContext.Provider>
  );
};

export const useChangeTheme = () => {
  const setTheme = React.useContext(ThemeDispatchContext);
  const changeTheme = (theme) => {
    if (theme) {
      setTheme(theme);
      return theme;
    }
    setTheme(defaultTheme);
    return defaultTheme;
  };
  return changeTheme;
};

export default ThemeProvider;
