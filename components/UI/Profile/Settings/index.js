import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Slide,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemIcon,
} from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/Security';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import PaletteIcon from '@material-ui/icons/Palette';
import { useLang } from '../../../../store/contexts/langContext';

import useStyles from './styles';
import SecurityPrivacy from './securitySettings';
import ProfileSettings from './profileSettings';
import ProjectSettings from './projectSettings';
import JobPreferences from './jobPreferences';
import StylesPreferences from './stylePreferences';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Settings = (props) => {
  const { open, handleClose } = props;
  const { lang } = useLang();
  const styles = useStyles();
  const [optionSelected, setOptSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((state) => !state);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            {lang.menu.settings}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {lang.buttons.close}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box className={styles.mainBox}>
          <Grid container spacing={4}>
            <Grid md={!expanded ? 3 : 1} xs={12} item>
              <Box className={styles.bordered}>
                <List>
                  <ListItem
                    button
                    selected={optionSelected === 0}
                    onClick={() => {
                      setOptSelected(0);
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    {!expanded && <ListItemText primary={lang.settings.profileSettings} />}
                  </ListItem>
                  <Divider variant="fullWidth" />

                  <ListItem
                    button
                    selected={optionSelected === 1}
                    onClick={() => {
                      setOptSelected(1);
                    }}
                  >
                    <ListItemIcon>
                      <SettingIcon />
                    </ListItemIcon>
                    {!expanded && <ListItemText primary={lang.settings.projectSettings} />}
                  </ListItem>

                  <Divider variant="fullWidth" />

                  <ListItem
                    button
                    selected={optionSelected === 2}
                    onClick={() => {
                      setOptSelected(2);
                    }}
                  >
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    {!expanded && <ListItemText primary={lang.settings.jobPreferences} />}
                  </ListItem>

                  <ListItem
                    button
                    selected={optionSelected === 3}
                    onClick={() => {
                      setOptSelected(3);
                    }}
                  >
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={lang.settings.SecAndPriv} />
                  </ListItem>
                  <Divider variant="fullWidth" />

                  <Divider variant="fullWidth" />
                  <ListItem
                    button
                    selected={optionSelected === 4}
                    onClick={() => {
                      setOptSelected(4);
                    }}
                  >
                    <ListItemIcon>
                      <PaletteIcon />
                    </ListItemIcon>
                    {!expanded && <ListItemText primary={lang.settings.stylesPreferences} />}
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid md={!expanded ? 9 : 11} xs={12} item>
              <ProfileSettings hidden={optionSelected !== 0} />
              <ProjectSettings hidden={optionSelected !== 1} />
              <JobPreferences hidden={optionSelected !== 2} />
              <SecurityPrivacy hidden={optionSelected !== 3} />
              <StylesPreferences hidden={optionSelected !== 4} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
};

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Settings;
