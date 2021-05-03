/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Typography, Chip, Avatar, useTheme } from '@material-ui/core';
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
import HeaderTemplate from '../HeaderTemplate';

const EditOutlined = dynamic(() => import('@material-ui/icons/EditOutlined'));
const PostAddOutlined = dynamic(() => import('@material-ui/icons/PostAddOutlined'));
const ProfileMenu = dynamic(() => import('./ProfileMenu'));
const ProfileButtons = dynamic(() => import('./Buttons/ProfileButtons'));

const CustomChip = (props) => {
  const { skill, selected, onClick } = props;
  const theme = useTheme();

  let style = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper), //theme.palette.text.primary,
  };
  if (!selected) {
    style = {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main), //theme.palette.text.primary,
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
    </>
  );
};

PersonData.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default PersonData;
