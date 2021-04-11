/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import EditablePhoto from '../Avatar/EditableAvatarPhoto';
import { useProfile } from '../../../store/contexts/profileContext';
import { useLang } from '../../../store/contexts/langContext';
import { usePersonDataStyles } from './styles';
import SharePublicLink from '../SharePublicLink';
import SkillsCategorys from '../../../constants/skillsCategorysConst';

const SecondaryButtons = (props) => {
  const { editableActions, size } = props;
  return editableActions.map((action) => {
    if (action.link) {
      return (
        <Link key={action.name} href={action.link} passHref>
          <Tooltip title={action.name}>
            <IconButton onClick={action.onClick} size={size}>
              {action.icon}
            </IconButton>
          </Tooltip>
        </Link>
      );
    }
    return (
      <Tooltip title={action.name} key={action.name}>
        <IconButton onClick={action.onClick} size={size}>
          {action.icon}
        </IconButton>
      </Tooltip>
    );
  });
};

SecondaryButtons.propTypes = {
  editableActions: PropTypes.arrayOf(PropTypes.any).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
};
SecondaryButtons.default = {
  size: 'medium',
};

const PersonData = (props) => {
  const { edit } = props;
  const { user } = useProfile();
  const { lang } = useLang();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const router = useRouter();
  const styles = usePersonDataStyles();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [shareLinkIsOpen, setShareLinkOpen] = React.useState(false);

  const handleClickOpenShareLink = () => {
    setShareLinkOpen(true);
  };

  const handleCloseShareLink = () => {
    setShareLinkOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const editableActions = edit
    ? [
        {
          icon: <EditOutlined className={styles.editableButtonsIcons} />,
          name: lang.buttons.editButton,
          onClick: () => {},
          link: `${router.asPath}/edit`,
        },
        {
          icon: <PostAddOutlined className={styles.editableButtonsIcons} />,
          name: lang.buttons.addProjectButton,
          onClick: () => {},
          link: `${router.asPath}/projects/new`,
        },
        {
          icon: <ShareOutlined className={styles.editableButtonsIcons} />,
          name: lang.buttons.sharedPortfolioButton,
          onClick: () => {
            handleClickOpenShareLink(true);
          },
        },
      ]
    : [];

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
        <LanguageButton
          styles={{ paddingTop: 0, paddingBottom: 0 }}
          title={lang.buttons.languageButton}
        />
        {lang.buttons.languageButton}
      </MenuItem>
      <MenuItem>
        <ThemeButton
          styles={{ paddingTop: 0, paddingBottom: 0 }}
          title={lang.buttons.themeButton}
        />
        {lang.buttons.themeButton}
      </MenuItem>
      {edit && (
        <MenuItem>
          <FeedbackButton
            styles={{ paddingTop: 0, paddingBottom: 0 }}
            title={lang.buttons.feedbackButton}
          />
          {lang.buttons.feedbackButton}
        </MenuItem>
      )}
      {edit && (
        <MenuItem>
          <LogoutButton
            styles={{ paddingTop: 0, paddingBottom: 0 }}
            title={lang.buttons.logoutButton}
          />
          {lang.buttons.logoutButton}
        </MenuItem>
      )}
    </Menu>
  );
  const AvatarEl = edit ? (
    <EditablePhoto size="adjustable" onClick={() => {}}>
      <AvatarPhoto src={user.image} size="adjustable" editable={edit} />
    </EditablePhoto>
  ) : (
    <AvatarPhoto src={user.image} size="adjustable" editable={edit} />
  );
  return (
    <>
      <AppBar style={{ position: 'inherit', backgroundColor: 'transparent' }}>
        <div className={styles.north}>
          <div className={styles.avatar}>
            {AvatarEl}
            <div className={styles.editButtonsDesktop}>
              <SecondaryButtons size="medium" editableActions={editableActions} />
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
              <SecondaryButtons size="small" editableActions={editableActions} />
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
          <Typography align="center" color="primary" className={styles.text}>
            {Array.from(
              new Set(
                user.projects
                  .reduce((acum, p) => [...acum, ...p.skills], [])
                  .filter((skill) => skill.category === SkillsCategorys.PROG_LANG)
                  .map((skill) => skill.name)
              )
            ).join(' | ')}
          </Typography>
        </div>
      </AppBar>
      {renderMobileMenu}
      <SharePublicLink open={shareLinkIsOpen} handleClose={handleCloseShareLink} />
    </>
  );
};

PersonData.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default PersonData;
