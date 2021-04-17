/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Typography, Chip, Avatar, useTheme } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import PostAddOutlined from '@material-ui/icons/PostAddOutlined';
import PublicIcon from '@material-ui/icons/Public';
// eslint-disable-next-line import/no-named-as-default-member
import AvatarPhoto from '../Avatar/AvatarPhoto';
import { useProfile } from '../../../store/contexts/profileContext';
import {
  useChangeFilterProject,
  useFilterProject,
} from '../../../store/contexts/filterProjectContext';
import { useLang } from '../../../store/contexts/langContext';
import { usePersonDataStyles } from './styles';
import SkillsCategorys from '../../../constants/skillsCategorysConst';
import ProfileMenu from './ProfileMenu';
import ProfileButtons from './Buttons/ProfileButtons';
import HeaderTemplate from '../HeaderTemplate';
// import SharePublicLink from '../SharePublicLink';
const SharePublicLink = dynamic(() => import('../SharePublicLink'));

const CustomChip = (props) => {
  const { skill, selected, onClick } = props;
  const theme = useTheme();

  let style = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  };
  if (!selected) {
    style = {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    };
  }

  return (
    <Chip
      key={skill.skill}
      variant={selected ? 'default' : 'outlined'}
      size="small"
      color="primary"
      label={skill.skill}
      avatar={<Avatar style={style}>{skill.cant > 99 ? '99+' : skill.cant}</Avatar>}
      style={{ margin: 4 }}
      clickable
      onClick={onClick}
    />
  );
};

CustomChip.propTypes = {
  skill: PropTypes.shape({ skill: PropTypes.string.isRequired, cant: PropTypes.number.isRequired })
    .isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const PersonData = (props) => {
  const { edit } = props;
  const { user, skills } = useProfile();
  const changeFilterProject = useChangeFilterProject();
  const filterProject = useFilterProject();
  const { lang } = useLang();
  const router = useRouter();
  const styles = usePersonDataStyles();

  const [shareLinkIsOpen, setShareLinkOpen] = React.useState(false);

  const handleClickOpenShareLink = () => {
    setShareLinkOpen(true);
  };

  const handleCloseShareLink = () => {
    setShareLinkOpen(false);
  };

  const handleClickSkill = (skillObj) => {
    if (
      filterProject &&
      filterProject.skill &&
      filterProject.skill.find((skillFilter) => skillFilter === skillObj.skill)
    ) {
      changeFilterProject.removeFilter('skill', skillObj.skill);
    } else {
      changeFilterProject.addFilter('skill', skillObj.skill);
    }
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
          icon: <PublicIcon className={styles.editableButtonsIcons} />,
          name: lang.buttons.sharedPortfolioButton,
          onClick: () => {
            handleClickOpenShareLink(true);
          },
        },
      ]
    : [];

  return (
    <>
      <HeaderTemplate
        AvatarCmp={<AvatarPhoto src={user.image} size="adjustable" editable={edit} />}
        SecondaryAvatarSection={
          <>
            <ProfileButtons size="medium" editableActions={editableActions} />
            {!edit && (
              <div className={styles.tag}>
                <Typography variant="button" color="textPrimary">
                  {lang.openToWork}
                </Typography>
              </div>
            )}
          </>
        }
        headerTitle={user.name}
        headerSubTitle={user.title}
        description={user.description}
        DesciptionLowAreaCmp={
          <Typography align="center" color="primary" className={styles.text}>
            {skills
              .filter((skill) => skill.category === SkillsCategorys.PROG_LANG)
              .map((skill) => (
                <CustomChip
                  skill={skill}
                  selected={
                    filterProject &&
                    filterProject.skill &&
                    filterProject.skill.find((skillFilter) => skillFilter === skill.skill)
                  }
                  onClick={() => handleClickSkill(skill)}
                />
              ))}
          </Typography>
        }
        Menu={edit && <ProfileMenu />}
      />
      {edit && <SharePublicLink open={shareLinkIsOpen} handleClose={handleCloseShareLink} />}
    </>
  );
};

PersonData.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default PersonData;
