// Ext libs
import React, { useState, useEffect } from 'react';
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
  const { stepId, data } = props;
  // hooks
  const [proyectLink, setProjectLink] = useState(null);
  const [devLink, setDevLink] = useState(null);

  // styles
  const classes = useStepsStyles();

  // effecs
  useEffect(() => {
    if (data) {
      if (data.devLink && data.devLink.url) {
        setDevLink(data.devLink.url);
      }
      if (data.proyectLink && data.proyectLink.url) {
        setProjectLink(data.proyectLink.url);
      }
    }
  }, [data]);

  return (
    <Box className={classes.mainContent} hidden={stepId !== LINKS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
          Puedes mostrar tu trabajo en línea? Compártelo para que otros lo vean.
        </Typography>
      </Box>
      <LinkPreview label="Vínculo del proyecto" setLink={setProjectLink} url={proyectLink} />
      <LinkPreview label="Vínculo de desarrollo" setLink={setDevLink} url={devLink} />
    </Box>
  );
};

LinksForm.propTypes = {
  stepId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    devLink: {
      url: PropTypes.string.isRequired,
    },
    proyectLink: {
      url: PropTypes.string.isRequired,
    },
  }),
};
LinksForm.defaultProps = {
  data: null,
};

export const linksObj = new ProjectStep(LINKS, 'Enlaces externos');
