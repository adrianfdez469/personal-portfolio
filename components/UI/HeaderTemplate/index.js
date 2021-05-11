/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Divider } from '@material-ui/core';
import useStyles from './styles';

const PersonData = (props) => {
  const {
    AvatarCmp,
    SecondaryAvatarSection,
    Menu,
    DesciptionLowAreaCmp,
    headerTitle,
    headerSubTitle,
    description,
  } = props;

  const styles = useStyles();

  return (
    <>
      <AppBar style={{ position: 'inherit', backgroundColor: 'transparent' }}>
        <div className={styles.north}>
          <div className={styles.avatar}>
            {AvatarCmp}
            <div className={styles.editButtonsDesktop}>{SecondaryAvatarSection}</div>
          </div>

          <div className={styles.titleBox}>
            <Typography variant="h3" component="h1" className={styles.headerPrimary}>
              {headerTitle}
            </Typography>

            <Typography variant="h6" component="h2" className={styles.headerSecondary}>
              {headerSubTitle}
            </Typography>
            <div className={styles.editButtonsMobile}>{SecondaryAvatarSection}</div>
          </div>

          <div className={styles.menu}>{Menu}</div>
        </div>

        <div
          className={styles.south}
          style={!AvatarCmp || !SecondaryAvatarSection ? { padding: '8px 32px 8px 32px' } : null}
        >
          <Typography align="center" variant="h6" className={styles.text}>
            {description}
          </Typography>
          {description && description !== '' && DesciptionLowAreaCmp && (
            <Divider orientation="horizontal" className={styles.divider} />
          )}
          {DesciptionLowAreaCmp}
        </div>
      </AppBar>
    </>
  );
};

PersonData.propTypes = {
  AvatarCmp: PropTypes.element,
  SecondaryAvatarSection: PropTypes.element,
  Menu: PropTypes.element,
  DesciptionLowAreaCmp: PropTypes.element,
  headerTitle: PropTypes.string,
  headerSubTitle: PropTypes.string,
  description: PropTypes.string,
};
PersonData.defaultProps = {
  AvatarCmp: null,
  SecondaryAvatarSection: null,
  Menu: null,
  DesciptionLowAreaCmp: null,
  headerTitle: '',
  headerSubTitle: '',
  description: '',
};

export default PersonData;
