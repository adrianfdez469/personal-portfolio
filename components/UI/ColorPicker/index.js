import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  colors as Colors,
  darken,
  lighten,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { useLang } from '../../../store/contexts/langContext';
import useStyles from './styles';

const useColorPicker = (title, hexCol, lightCol, darkCol, shade, tonal) => {
  const { lang } = useLang();

  const [hexColor, setHexColor] = useState(hexCol);
  const [lightHexColor, setLightHexColor] = useState(lightCol);
  const [darkHexColor, setDarkHexColor] = useState(darkCol);
  const [selectedColor, setSelectedColor] = useState();

  const styles = useStyles();

  const handleSelect = (colorName) => {
    setSelectedColor(colorName);
    setHexColor(Colors[colorName][shade]);
    setLightHexColor(lighten(Colors[colorName][shade], tonal));
    setDarkHexColor(darken(Colors[colorName][shade], tonal));
  };

  const handleHexColorChange = (event) => {
    setHexColor(event.target.value);
    setLightHexColor(lighten(event.target.value, tonal));
    setDarkHexColor(darken(event.target.value, tonal));
    setSelectedColor(null);
  };

  useEffect(() => {
    setLightHexColor(lighten(hexColor, tonal));
    setDarkHexColor(darken(hexColor, tonal));
  }, [tonal]);

  useEffect(() => {
    if (selectedColor) {
      setHexColor(Colors[selectedColor][shade]);
      setLightHexColor(lighten(Colors[selectedColor][shade], tonal));
      setDarkHexColor(darken(Colors[selectedColor][shade], tonal));
    }
  }, [shade]);

  const component = (
    <Box p={2} className={styles.bgColor}>
      <Box p={2} className={styles.bordered}>
        <Box m={1} className={styles.flexSpaced}>
          <Typography variant="h6" style={{ fontSize: 18 }}>
            {`${title}:`}
          </Typography>

          <TextField value={hexColor} onChange={handleHexColorChange} />
        </Box>
        <Grid container justify="center" className={[styles.colorPickerBox].join(' ')}>
          <>
            {Object.keys(Colors)
              .filter((color) => color !== 'common')
              .map((color) => (
                <Grid
                  item
                  key={color}
                  style={{
                    backgroundColor: Colors[color][500],
                  }}
                  className={[
                    styles.bordered,
                    styles.colorPickerColor,
                    styles.colorNormalSize,
                  ].join(' ')}
                  onClick={() => handleSelect(color)}
                >
                  {color === selectedColor && <CheckIcon fontSize="large" />}
                </Grid>
              ))}
          </>
        </Grid>

        <Grid
          container
          justify="center"
          className={[styles.bordered, styles.colorSelectedGrid].join(' ')}
        >
          <Grid
            item
            style={{
              backgroundColor: lightHexColor,
              flex: 1,
            }}
            className={[styles.bordered, styles.colorPickerColor].join(' ')}
          >
            <Typography>{lang.settings.light}</Typography>
          </Grid>

          <Grid
            item
            style={{
              backgroundColor: hexColor,
              flex: 1,
            }}
            className={[styles.bordered, styles.colorPickerColor].join(' ')}
          >
            <Typography>{lang.settings.main}</Typography>
          </Grid>
          <Grid
            item
            style={{
              backgroundColor: darkHexColor,
              flex: 1,
            }}
            className={[styles.bordered, styles.colorPickerColor].join(' ')}
          >
            <Typography>{lang.settings.dark}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return [
    () => component,
    () => ({
      hexColor,
      lightHexColor,
      darkHexColor,
    }),
  ];
};

export default useColorPicker;
