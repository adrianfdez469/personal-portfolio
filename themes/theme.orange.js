import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#1985ff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    type: 'dark',
  },
});

export default theme;
