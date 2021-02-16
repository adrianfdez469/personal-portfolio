// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@material-ui/core';
import ReactProfileImage from '@daym3l/react-profile-image';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles, useGalleryStyles } from '../styles';
// constants
import { maxImagesCount, maxImgSize } from '../../../../constants/projectImagesConst';

export const GALLERY = 'GALLERY';

export const GalleryForm = (props) => {
  const { stepId } = props;
  const stepStyles = useStepsStyles();
  const galleryStyles = useGalleryStyles();
  const [images, setImages] = useState([]);

  const addImageHandler = (base64Img, imageFile) => {
    const imageId = Math.random();
    setImages([...images, { id: imageId, img: base64Img, file: imageFile }]);
  };

  const removeImageHandler = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <Box className={stepStyles.mainContent} hidden={stepId !== GALLERY}>
      <Box>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          Muestra tus resultados con imágenes
        </Typography>
        <Typography align="center" color="primary">
          {`${images.length}/${maxImagesCount}`}
        </Typography>
      </Box>
      <div className={galleryStyles.uploadImgContainer}>
        {images.map((image) => (
          <Box m={2} key={image.id} className={galleryStyles.uploadImgWrapper}>
            <IconButton
              aria-label="Delete"
              size="small"
              className={galleryStyles.uploadImgCloseButon}
              onClick={() => removeImageHandler(image.id)}
            >
              <HighlightOffIcon fontSize="small" />
            </IconButton>
            <ReactProfileImage
              camera
              returnImage={() => {}}
              defaultImage={image.img}
              uploadBtnProps={{ disabled: true }}
              cameraBtnProps={{ disabled: true }}
              maxImgSize={0}
            />
          </Box>
        ))}
        {images.length < maxImagesCount && (
          <Box m={2} className={galleryStyles.uploadImgWrapper}>
            <ReactProfileImage
              camera
              returnImage={addImageHandler}
              defaultImage="/static/images/default_image_background.jpg"
              clearPreview
              maxImgSize={maxImgSize}
              isNotImgErrorMsg="Solo imagenes"
              sizeErrorMsg="Tamaño máximo 250KB"
            />
          </Box>
        )}
      </div>
    </Box>
  );
};

GalleryForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const galleryObj = new ProjectStep(GALLERY, 'Galería');
