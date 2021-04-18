import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';
import { makeStyles, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { useChangeTheme } from '../../../store/contexts/themeContext';
import { useLang } from '../../../store/contexts/langContext';
// eslint-disable-next-line import/named
import { themesLoader } from '../../../themes';

const saveUserTheme = `
    mutation updateUser($userId: ID!, $user: UserParams!) {
      updateUser(userId: $userId, user: $user){
        code
        success
        message
        user {
          theme
        }
      }
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const ThemeButton = (props) => {
  const { withColor, styles, title } = props;
  const classes = useStyles();
  const setTheme = useChangeTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { lang } = useLang();

  // Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectTheme = async (themeKey) => {
    const theme = await themesLoader[themeKey].getTheme();
    setTheme(theme);
    handleClose();
    localStorage.setItem('theme', themeKey);
    const session = await getSession();
    if (session && session.userId) {
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: saveUserTheme,
          variables: {
            userId: session.userId,
            user: {
              theme: themeKey,
            },
          },
        }),
      });
    }
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={handleClick} style={styles}>
          <InvertColorsIcon className={withColor ? classes.root : ''} />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(themesLoader).map((theme) => (
          <MenuItem key={theme} onClick={() => selectTheme(theme)}>
            {lang.themes[theme]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

ThemeButton.propTypes = {
  withColor: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.any,
  title: PropTypes.string.isRequired,
};
ThemeButton.defaultProps = {
  withColor: false,
  styles: null,
};

export default ThemeButton;
