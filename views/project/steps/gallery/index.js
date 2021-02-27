// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import ReactProfileImage from '../../../../components/UI/UploadImage';
// Hooks
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import { useStepsStyles } from '../../styles';
import useGalleryStyles from './styles';

// constants
import { maxImagesCount, maxImgSize } from '../../../../constants/projectImagesConst';

const GalleryForm = (props) => {
  const { show } = props;
  // hooks
  const stepStyles = useStepsStyles();
  const galleryStyles = useGalleryStyles();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { lang } = useLang();

  // handlers
  const addImageHandler = async (base64Img, imageFile) => {
    const imageId = Math.random();
    setImages([...images, { id: imageId, img: base64Img, file: imageFile, url: null }]);
    setUploading(true);
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
      })
      .finally(() => {
        setUploading(false);
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
    <Box className={stepStyles.mainContent} hidden={!show}>
      <Box>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          {lang.galleryStep.header.title}
          <Box component="span" className={galleryStyles.primaryColor}>
            {` ${images.length}/${maxImagesCount}`}
          </Box>
        </Typography>
      </Box>
      <div className={galleryStyles.uploadImgContainer}>
        {images.map((image, idx) => (
          <Box m={2} key={image.id} className={galleryStyles.uploadImgWrapper}>
            {uploading && idx === images.length - 1 ? null : (
              <IconButton
                aria-label="Delete"
                size="small"
                className={galleryStyles.uploadImgCloseButon}
                onClick={() => removeImageHandler(image.id)}
              >
                <HighlightOffIcon fontSize="small" />
              </IconButton>
            )}
            <ReactProfileImage
              camera
              returnImage={() => {}}
              defaultImage={image.img}
              uploadBtnProps={{ disabled: true, label: lang.galleryStep.body.uploadBtn }}
              cameraBtnProps={{ disabled: true, label: lang.galleryStep.body.cameraBtn }}
              maxImgSize={0}
              id={image.id}
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
              isNotImgErrorMsg={lang.galleryStep.body.typeErrMsg}
              sizeErrorMsg={`${lang.galleryStep.body.sizeErrMsg} (${maxImgSize / 1024}Kb)`}
              uploadBtnProps={{ label: lang.galleryStep.body.uploadBtn }}
              cameraBtnProps={{ label: lang.galleryStep.body.cameraBtn }}
              cancelBtnProps={{ label: lang.galleryStep.body.cancelBtn }}
              takeBtnProps={{ label: lang.galleryStep.body.takeBtn }}
              id={999}
            />
          </Box>
        )}
      </div>
    </Box>
  );
};

GalleryForm.propTypes = {
  show: PropTypes.bool,
};
GalleryForm.defaultProps = {
  show: false,
};
export default GalleryForm;
