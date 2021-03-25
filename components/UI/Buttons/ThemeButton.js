import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { Brightness4Outlined } from '@material-ui/icons';
import { useChangeTheme } from '../../../store/contexts/themeContext';

const themes = {
  orange: async () => {
    return (await import('../../../themes/theme.orange')).default;
  },
  orangeDart: async () => {
    return (await import('../../../themes/theme.orange-dark')).default;
  },
  default: async () => {
    return (await import('../../../themes/theme.default')).default;
  },
  dark: async () => {
    return (await import('../../../themes/theme.dark')).default;
  },
  pink: async () => {
    return (await import('../../../themes/theme.pink')).default;
  },
  purple: async () => {
    return (await import('../../../themes/theme.purple')).default;
  },
};

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
  // Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectTheme = async (themeKey) => {
    const theme = await themes[themeKey]();
    setTheme(theme);
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={handleClick} style={styles}>
          <Brightness4Outlined className={withColor && classes.root} />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(themes).map((theme) => {
          return (
            <MenuItem key={theme} onClick={() => selectTheme(theme)}>
              {theme}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

ThemeButton.propTypes = {
  withColor: PropTypes.bool,
  styles: PropTypes.shape(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};
ThemeButton.defaultProps = {
  withColor: false,
};

export default ThemeButton;
