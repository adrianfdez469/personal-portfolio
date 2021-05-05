/* eslint-disable react/prop-types */
import React from 'react';
import cookie from 'js-cookie';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const saveThemeCookie = (data) => {
  cookie.set('theme', data, { expires: 360 });
};

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

const ThemeProvider = ({ children, loadedTheme }) => {
  const [theme, setTheme] = React.useState();

  React.useEffect(() => {
    if (loadedTheme) {
      setTheme(loadedTheme);
    } else {
      const cookieTheme = cookie.get('theme');
      if (cookieTheme) {
        setTheme(cookieTheme);
      } else {
        setTheme(defaultTheme);
      }
    }
  }, [loadedTheme]);

  const createTheme = () => {
    if (theme) {
      if (typeof theme === 'string') {
        const muitheme = JSON.parse(theme);
        if (typeof muitheme !== 'object') {
          return createMuiTheme(JSON.parse(muitheme));
        }
        return createMuiTheme(muitheme);
      }
      if (typeof theme === 'object') {
        return createMuiTheme(theme);
      }
    }
    return createMuiTheme();
  };

  return (
    <MuiThemeProvider theme={createTheme()}>
      <ThemeDispatchContext.Provider value={setTheme}>{children}</ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export const useChangeTheme = () => {
  const setTheme = React.useContext(ThemeDispatchContext);
  const changeTheme = (theme) => {
    if (theme) {
      saveThemeCookie(theme);
      setTheme(theme);
      return theme;
    }
    saveThemeCookie(defaultTheme);
    setTheme(defaultTheme);
    return defaultTheme;
  };
  return changeTheme;
};

export default ThemeProvider;
