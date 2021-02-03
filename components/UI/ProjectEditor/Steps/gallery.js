// Ext libs
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles } from '../styles';

export const GALLERY = 'GALLERY';

export const GalleryForm = (props) => {
  const { stepId } = props;
  const classes = useStepsStyles();
  return (
    <Box className={classes.mainContent} hidden={stepId !== GALLERY}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" className={classes.stepDescriptionText}>
          Muestra tus resultados con imágenes
        </Typography>
      </Box>
    </Box>
  );
};

GalleryForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const galleryObj = new ProjectStep(GALLERY, 'Galería');
