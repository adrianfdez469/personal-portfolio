/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import EditOutlined from '@material-ui/icons/EditOutlined';
import PostAddOutlined from '@material-ui/icons/PostAddOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import LanguageButton from '../Buttons/LanguageButton';
import ThemeButton from '../Buttons/ThemeButton';
import FeedbackButton from '../Buttons/FeedbackButton';
import LogoutButton from '../Buttons/LogoutButton';
// eslint-disable-next-line import/no-named-as-default-member
import AvatarPhoto from '../Avatar/AvatarPhoto';
import { useProfile } from '../../../store/contexts/profileContext';
import { useLang } from '../../../store/contexts/langContext';
import { usePersonDataStyles } from './styles';

const PersonData = (props) => {
  const { edit } = props;
  const styles = usePersonDataStyles();
  const { user } = useProfile();
  const { lang } = useLang();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const editableActions = [
    {
      icon: <EditOutlined className={styles.editableButtonsIcons} />,
      name: lang.buttons.editButton,
      onClick: () => {},
    },
    {
      icon: <PostAddOutlined className={styles.editableButtonsIcons} />,
      name: lang.buttons.addProjectButton,
      onClick: () => {},
    },
    {
      icon: <ShareOutlined className={styles.editableButtonsIcons} />,
      name: lang.buttons.sharedPortfolioButton,
      onClick: () => {},
    },
  ];

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <LanguageButton styles={{ paddingTop: 0, paddingBottom: 0 }} />
        {lang.buttons.languageButton}
      </MenuItem>
      <MenuItem>
        <ThemeButton styles={{ paddingTop: 0, paddingBottom: 0 }} />
        {lang.buttons.themeButton}
      </MenuItem>
      {edit && (
        <>
          <MenuItem>
            <FeedbackButton styles={{ paddingTop: 0, paddingBottom: 0 }} />
            {lang.buttons.feedbackButton}
          </MenuItem>
          <MenuItem>
            <LogoutButton styles={{ paddingTop: 0, paddingBottom: 0 }} />
            {lang.buttons.logoutButton}
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar style={{ position: 'inherit', backgroundColor: 'transparent' }}>
        <div className={styles.north}>
          <div className={styles.avatar}>
            <AvatarPhoto src={user.image} size="adjustable" edit={edit} />
            <div className={styles.editButtonsDesktop}>
              {edit &&
                editableActions.map((action) => (
                  <Tooltip key={action.name} title={action.name}>
                    <IconButton onClick={action.onClick}>{action.icon}</IconButton>
                  </Tooltip>
                ))}
            </div>
          </div>
          <div className={styles.titleBox}>
            <Typography variant="h3" component="h1" className={styles.headerPrimary}>
              {user.name}
            </Typography>
            <Typography variant="h6" component="h2" className={styles.headerSecondary}>
              {user.title}
            </Typography>
            <div className={styles.editButtonsMobile}>
              {edit &&
                editableActions.map((action) => (
                  <Tooltip key={action.name} title={action.name}>
                    <IconButton onClick={action.onClick} size="small">
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                ))}
            </div>
          </div>

          <div className={styles.sectionDesktop}>
            <LanguageButton withColor title={lang.buttons.languageButton} />
            <ThemeButton withColor title={lang.buttons.themeButton} />
            {edit && (
              <>
                <FeedbackButton withColor title={lang.buttons.feedbackButton} />
                <LogoutButton withColor title={lang.buttons.logoutButton} />
              </>
            )}
          </div>

          <div className={styles.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.south}>
          <Typography align="center" className={styles.text}>
            {user.description}
          </Typography>
          {user.description && user.description !== '' && (
            <Divider orientation="horizontal" className={styles.divider} />
          )}
          <Typography align="center" className={styles.text}>
            JAVA | HTML | CSS
          </Typography>
        </div>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

PersonData.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default PersonData;
