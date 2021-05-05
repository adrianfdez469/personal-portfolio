import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
  FormControlLabel,
  Switch,
  useTheme,
  Button,
  Slider,
} from '@material-ui/core';
// import Amber from '@material-ui/';

import { useLang } from '../../../../../store/contexts/langContext';
import { useProfile } from '../../../../../store/contexts/profileContext';
import { useChangeTheme } from '../../../../../store/contexts/themeContext';
import Backdrop from '../../../backdrop';
import useMessage from '../../../../../hooks/useMessage';
import useColorPicker from '../../../ColorPicker';
import useStyles from '../styles';

const saveUserThemeQuery = `
mutation saveUserTheme($userId:ID!, $user: UserParams!) {
  updateUser(userId: $userId, user: $user) {
    code
    success
    message
    user {
      theme
    }
  }
}
`;

const Shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];

const StylesPreferences = (props) => {
  const { hidden } = props;
  const { user } = useProfile();
  const [showMessage] = useMessage();
  const styles = useStyles();
  const { lang } = useLang();
  const { palette } = useTheme();
  const [darkMode, setDarkMode] = useState(palette.type === 'dark');
  const [loading, setloading] = useState(false);
  const [tonalOffset, setTonalOffset] = useState(palette.tonalOffset);
  const [shadeColor, setShadeColor] = React.useState(5);
  const setTheme = useChangeTheme();

  const [MainColorPicker, getMainCpState] = useColorPicker(
    lang.settings.primaryColor,
    palette.primary.main,
    palette.primary.light,
    palette.primary.dark,
    Shades[shadeColor],
    tonalOffset
  );

  const [SecondaryColorPicker, getSecCpState] = useColorPicker(
    lang.settings.secondaryColor,
    palette.secondary.main,
    palette.secondary.light,
    palette.secondary.dark,
    Shades[shadeColor],
    tonalOffset
  );

  const handleChangeDarkMode = (event, checked) => {
    setDarkMode(checked);
  };

  const handleTonalOffsetChange = (event, newValue) => {
    setTonalOffset(newValue);
  };
  const handleShadeChange = (event, newValue) => {
    setShadeColor(newValue);
  };

  const customFetch = (stringifyTheme, okMsg, okAction, errMsg) => {
    fetch(`/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: saveUserThemeQuery,
        variables: {
          userId: user.id,
          user: {
            theme: JSON.stringify(stringifyTheme),
          },
        },
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('ERROR');
        }
        return resp.json();
      })
      .then((resp) => {
        if (!resp.data.updateUser.success) {
          throw new Error('ERROR');
        }
        setloading(false);
        showMessage(okMsg, 'success');
        okAction();
      })
      .catch(() => {
        setloading(false);
        showMessage(errMsg, 'error');
      });
  };

  const handleSave = () => {
    setloading(true);
    const principal = getMainCpState();
    const secondary = getSecCpState();
    const themeObj = {
      palette: {
        primary: {
          main: principal.hexColor,
          light: principal.lightHexColor,
          dark: principal.darkHexColor,
        },
        secondary: {
          main: secondary.hexColor,
          light: secondary.lightHexColor,
          dark: secondary.darkHexColor,
        },
        type: darkMode ? 'dark' : 'light',
        tonalOffset,
      },
    };
    // const stringifyTheme = JSON.stringify(themeObj);
    customFetch(
      themeObj,
      lang.settings.msg.styleSaved,
      () => setTheme(themeObj),
      lang.settings.msg.styleSavedError
    );
  };

  const handleReset = () => {
    const defaultTheme = setTheme();
    // const stringifyTheme = JSON.stringify(defaultTheme);
    customFetch(
      defaultTheme,
      lang.settings.msg.styleSaved,
      () => {},
      lang.settings.msg.styleSavedError
    );
  };

  return (
    <>
      <Box hidden={hidden}>
        <Typography variant="h5">{lang.settings.stylesPreferences}</Typography>
        <Divider />
        <Box pb={0} p={2} className={styles.flexSpaced}>
          <FormControlLabel
            control={<Switch color="primary" checked={darkMode} onChange={handleChangeDarkMode} />}
            label={lang.settings.useDarkMode}
          />
          <Box>
            <Button variant="contained" color="secondary" onClick={handleSave}>
              {lang.buttons.save}
            </Button>
            <Box component="span" m={1} />
            <Button variant="contained" color="secondary" onClick={handleReset}>
              {lang.buttons.reset}
            </Button>
          </Box>
        </Box>

        <Box pb={0} pt={0} p={2} className={styles.flexRow}>
          <Typography id="discrete-slider">{lang.settings.shade}</Typography>
          <Slider
            style={{ marginLeft: 8 }}
            valueLabelFormat={(value) => Shades[value]}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
            min={0}
            max={13}
            value={shadeColor}
            onChange={handleShadeChange}
          />
        </Box>
        <Box pb={0} pt={0} p={2} className={styles.flexRow}>
          <Typography id="discrete-slider-1">{lang.settings.tonal}</Typography>
          <Slider
            style={{ marginLeft: 8 }}
            aria-labelledby="discrete-slider-1"
            valueLabelDisplay="auto"
            marks
            step={0.1}
            min={0}
            max={1}
            value={tonalOffset}
            onChange={handleTonalOffsetChange}
          />
        </Box>
        <Box className={[styles.flexRow].join(' ')}>
          <MainColorPicker />
          <SecondaryColorPicker />
        </Box>
      </Box>
      <Backdrop open={loading} />
    </>
  );
};
StylesPreferences.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default StylesPreferences;
