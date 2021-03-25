/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/named
import { themesLoader } from '../../themes';

const ThemeDispatchContext = React.createContext(null);

const ThemeProvider = ({ children, loadedTheme }) => {
  const [theme, setTheme] = React.useState(loadedTheme);

  useEffect(() => {
    if (!theme) {
      const localStTheme = localStorage.getItem('theme');
      if (!localStTheme) {
        (async () => {
          const newTheme = await themesLoader.orangeDark.getTheme();
          setTheme(newTheme);
        })();
      } else if (localStTheme !== theme) {
        (async () => {
          const newTheme = await themesLoader[localStTheme].getTheme();
          setTheme(newTheme);
        })();
      }
    }
  }, [theme]);

  const createTheme = () => {
    if (theme) return createMuiTheme(theme);
    return createMuiTheme();
  };

  return (
    <MuiThemeProvider theme={createTheme()}>
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
