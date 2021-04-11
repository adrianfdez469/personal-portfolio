import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { makeStyles, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { useLang } from '../../../store/contexts/langContext';

// eslint-disable-next-line react/prop-types
const CustMenuComp = React.forwardRef(({ onClick, href, locale, children }, ref) => (
  <Link href={href} locale={locale}>
    <MenuItem ref={ref} onClick={onClick}>
      {children}
    </MenuItem>
  </Link>
));

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
          <LanguageIcon className={withColor ? classes.root : ''} />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {lang
          ? router.locales
              .filter((locale) => locale !== router.locale)
              .map((locale) => (
                <CustMenuComp
                  key={locale}
                  onClick={() => handleClose()}
                  href={router.asPath}
                  locale={locale}
                >
                  {lang[locale]}
                </CustMenuComp>
              ))
          : []}
      </Menu>
    </>
  );
};

LanguageButton.propTypes = {
  withColor: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.any,
  title: PropTypes.string.isRequired,
};
LanguageButton.defaultProps = {
  withColor: false,
  styles: null,
};
export default LanguageButton;
