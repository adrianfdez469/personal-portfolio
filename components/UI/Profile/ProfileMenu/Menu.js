import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getSession, signOut } from 'next-auth/client';

import {
  Popover,
  Card,
  CardHeader,
  Tooltip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import SettingIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/Security';
import LanguageIcon from '@material-ui/icons/Language';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import EditablePhoto from '../../Avatar/EditableAvatarPhoto';
import AvatarPhoto from '../../Avatar/AvatarPhoto';
import { useProfile } from '../../../../store/contexts/profileContext';
import { useLang } from '../../../../store/contexts/langContext';
import { useChangeTheme } from '../../../../store/contexts/themeContext';
// eslint-disable-next-line import/named
import { themesLoader } from '../../../../themes';
import useStyles from './styles';

const Settings = dynamic(() => import('../Settings'));

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

const Menu = (props) => {
  const { open, anchorEl, handleClose } = props;
  const styles = useStyles();
  const { user } = useProfile();
  const { lang } = useLang();
  const router = useRouter();
  const setTheme = useChangeTheme();
  const [currentTheme, setCurrentTheme] = useState(user.theme);
  const [settingsOpen, setSettingsOpen] = useState();

  const selectTheme = async (themeKey) => {
    const theme = await themesLoader[themeKey].getTheme();
    setTheme(theme);
    setCurrentTheme(themeKey);
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

  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  const handleEditAvatar = () => {
    // TODO: Not implemented
  };
  const handleOpenSettings = () => {
    handleClose();
    setSettingsOpen(true);
  };
  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const handlePrivacySecurity = () => {
    // TODO: Not implemented
  };
  const handleShare = () => {
    // TODO: Not implemented
  };
  const setBugreport = () => {
    // TODO: Not implemented
  };
  const makeDonation = () => {
    // TODO: Not implemented
  };

  return (
    <>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Card className={styles.root}>
          <CardHeader
            classes={{
              action: styles.cardHeaderAction,
              content: styles.cardHeaderContent,
            }}
            avatar={
              <EditablePhoto size="xsmall" onClick={() => {}}>
                <AvatarPhoto src={user.image} size="xsmall" editable={handleEditAvatar} />
              </EditablePhoto>
            }
            action={
              <Tooltip title={lang.buttons.logoutButton}>
                <IconButton onClick={handleLogout} id="idBtnLogout">
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            }
            title={user.name}
            subheader={user.email}
          />
          <Divider className={styles.firstDivider} />
          <List dense>
            <div id="profileMenuOptions">
              <Link href={`${router.asPath}/edit`} passHref>
                <ListItem button>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={lang.buttons.editButton}
                    primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                  />
                </ListItem>
              </Link>
              <ListItem button onClick={handleOpenSettings}>
                <ListItemIcon>
                  <SettingIcon />
                </ListItemIcon>
                <ListItemText
                  primary={lang.menu.settings}
                  primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                />
              </ListItem>
            </div>
            <Divider className={styles.divider} />
            <div id="profileOtherMenuOptions">
              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <FormControl fullWidth>
                  <Select
                    value={router.locale}
                    displayEmpty
                    className={styles.menuSelectField}
                    // inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {lang
                      ? router.locales.map((locale) => {
                          if (locale !== router.locale) {
                            return (
                              <Link
                                value={locale}
                                href={router.asPath}
                                locale={locale}
                                key={locale}
                              >
                                <MenuItem value={locale}>{lang[locale]}</MenuItem>
                              </Link>
                            );
                          }
                          return (
                            <MenuItem value={locale} disabled>
                              {lang[locale]}
                            </MenuItem>
                          );
                        })
                      : []}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <FormControl fullWidth>
                  <Select
                    value={currentTheme}
                    displayEmpty
                    className={styles.menuSelectField}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {Object.keys(themesLoader).map((theme) => (
                      <MenuItem
                        value={theme}
                        key={theme}
                        onClick={() => selectTheme(theme)}
                        disabled={theme === currentTheme}
                      >
                        {lang.themes[theme]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            </div>
            <Divider className={styles.divider} />
            <div id="MenuOptionsLessImportants">
              <ListItem button onClick={handleShare} disabled>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText
                  className={styles.listItemTextDense}
                  primary={lang.menu.share}
                  primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                  secondary={lang.menu.shareDescription}
                  secondaryTypographyProps={{ style: { fontSize: '0.8em' } }}
                />
              </ListItem>
              <ListItem button onClick={setBugreport} disabled>
                <ListItemIcon>
                  <BugReportIcon />
                </ListItemIcon>
                <ListItemText
                  className={styles.listItemTextDense}
                  primary={lang.menu.bug}
                  primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                  secondary={lang.menu.bugDescription}
                  secondaryTypographyProps={{ style: { fontSize: '0.8em' } }}
                />
              </ListItem>
              <ListItem button onClick={makeDonation} disabled>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText
                  className={styles.listItemTextDense}
                  primary={lang.menu.donation}
                  primaryTypographyProps={{ style: { fontSize: '0.9em' } }}
                  secondary={lang.menu.donationDescription}
                  secondaryTypographyProps={{ style: { fontSize: '0.8em' } }}
                />
              </ListItem>
            </div>
          </List>
        </Card>
      </Popover>
      <Settings open={settingsOpen} handleClose={handleCloseSettings} />
    </>
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.any.isRequired,
};

export default Menu;
