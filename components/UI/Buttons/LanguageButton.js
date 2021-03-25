import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { makeStyles, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import { useLang } from '../../../store/contexts/langContext';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
  },
}));

const LanguageButton = (props) => {
  const { withColor, styles, title } = props;
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { lang } = useLang();
  // Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={handleClick} style={styles}>
          <Language className={withColor && classes.root} />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {lang &&
          router.locales
            .filter((locale) => locale !== router.locale)
            .map((locale) => (
              <Link href={router.asPath} locale={locale}>
                <MenuItem onClick={() => handleClose()}>{lang[locale]}</MenuItem>
              </Link>
            ))}
      </Menu>
    </>
  );
};

LanguageButton.propTypes = {
  withColor: PropTypes.bool,
  styles: PropTypes.shape(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};
LanguageButton.defaultProps = {
  withColor: false,
};
export default LanguageButton;
