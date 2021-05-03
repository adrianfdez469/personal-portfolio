import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { IconButton, Tooltip } from '@material-ui/core';

const ProfileButtons = (props) => {
  const { editableActions, size } = props;
  return editableActions.map((action) => (
    <Link key={action.name} href={action.link} passHref>
      <Tooltip title={action.name}>
        <IconButton onClick={action.onClick} size={size}>
          {action.icon}
        </IconButton>
      </Tooltip>
    </Link>
  ));
};

ProfileButtons.propTypes = {
  editableActions: PropTypes.arrayOf(PropTypes.any).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
};
ProfileButtons.default = {
  size: 'medium',
};

export default ProfileButtons;
