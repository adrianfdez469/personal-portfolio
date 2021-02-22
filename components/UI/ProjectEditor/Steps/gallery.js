// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactProfileImage from '../../UploadImage';
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

  const addImageHandler = async (base64Img, imageFile) => {
    const imageId = Math.random();
    setImages([...images, { id: imageId, img: base64Img, file: imageFile, url: null }]);

    const formData = new FormData();
    formData.append('imageFile', imageFile);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error');
      })
      .then((resp) => {
        const { url } = resp;
        setImages((imagesSt) => {
          const idx = imagesSt.findIndex((img) => img.id === imageId);
          const newImages = [...imagesSt];
          newImages[idx].url = url;
          return newImages;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeImageHandler = (id) => {
    fetch('/api/deleteupload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: images.find((img) => img.id === id).url,
      }),
    });

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
              defaultImage="/images/no-image-red-2.png"
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
