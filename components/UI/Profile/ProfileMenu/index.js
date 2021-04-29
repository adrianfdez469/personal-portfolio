import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { makeStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Menu = dynamic(() => import('./Menu'));

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    color: theme.palette.background.paper,
    fontSize: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(4),
    },
  },
}));

const Icon = () => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={openMenu}>
        <MenuIcon className={styles.menuIcon} />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} handleClose={closeMenu} />
    </>
  );
};
export default Icon;
