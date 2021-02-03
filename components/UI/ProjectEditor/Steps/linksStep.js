// TODO: use styles with sizes from the style file
// TODO: Handle state with reducer
// TODO: Add 2 other links for github and gitlab code

// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
import LinkPreview from '../../LinkPreview';

// Styles
import { useStepsStyles } from '../styles';

export const LINKS = 'LINKS';

export const LinksForm = (props) => {
  // constants
  const { stepId } = props;
  // hooks
  const [proyectLink, setProjectLink] = useState();
  const [devLink, setDevLink] = useState();

  // styles
  const classes = useStepsStyles();

  return (
    <Box className={classes.mainContent} hidden={stepId !== LINKS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
          Puedes mostrar tu trabajo en línea? Compártelo para que otros lo vean.
        </Typography>
      </Box>
      <LinkPreview label="Vínculo del proyecto" setLink={setProjectLink} />
      <LinkPreview label="Vínculo de desarrollo" setLink={setDevLink} />
    </Box>
  );
};

LinksForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const linksObj = new ProjectStep(LINKS, 'Enlaces externos');
