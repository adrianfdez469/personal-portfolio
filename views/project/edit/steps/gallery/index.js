// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactProfileImage from '../../../../../components/UI/UploadImage';
// Hooks
import { useLang } from '../../../../../store/contexts/langContext';
// Components
import CustomBackdrop from '../../../../../components/UI/backdrop';
import StepItem from '../../../../../components/UI/StepForm/StepItem';
// Styles
import useGalleryStyles from './styles';

// constants
import { maxImagesCount, maxImgSize } from '../../../../../constants/projectImagesConst';

function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
}

const GalleryForm = (props) => {
  const { images, changeData } = props;
  // hooks
  const galleryStyles = useGalleryStyles();
  // const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { lang } = useLang();

  // handlers
  const addImageHandler = async (base64Img, image) => {
    let imageFile = image;
    if (!imageFile) {
      imageFile = await urltoFile(base64Img, 'Camera.jpeg', 'image/jpeg');
    }

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
        const imageId = Math.random();
        changeData([...images, { id: imageId, img: base64Img, file: imageFile, url: resp.url }]);
      })
      .catch((error) => {
        console.error(error);
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
    changeData(images.filter((img) => img.id !== id));
  };

  return (
    <StepItem
      label={
        <>
          {lang.galleryStep.header.title}
          <Box component="span" className={galleryStyles.primaryColor}>
            {` ${images.length}/${maxImagesCount}`}
          </Box>
        </>
      }
    >
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
              defaultImage={image.url}
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
              defaultImage="no-image-red-2_ckq2hb.png"
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
      <CustomBackdrop open={uploading} />
    </StepItem>
  );
};

GalleryForm.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any).isRequired,
  changeData: PropTypes.func.isRequired,
};
export default React.memo(GalleryForm);
