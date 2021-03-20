import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Badge, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  radio: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const SelectableAvatarPhoto = ({ children, selected, onClick }) => {
  const styles = useStyles();
  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={
        <Radio
          checked={selected}
          inputProps={{ 'aria-label': 'A' }}
          className={styles.radio}
          onChange={onClick}
        />
      }
    >
      {children}
    </Badge>
  );
};
SelectableAvatarPhoto.propTypes = {
  children: PropTypes.element.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
SelectableAvatarPhoto.defaultProps = {
  selected: false,
};

export default SelectableAvatarPhoto;
