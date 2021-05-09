/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { getPublicIdFromImageUrl } from '../../../libs/helpers';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  error: (styles) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: '2px 4px 2px 4px',
    boxSizing: 'border-box',
    borderRadius: '2px',
    textAlign: 'center',
    position: 'absolute',
    top: `calc(${styles.height || 200}px - calc(6px + 1em))`,
    width: '100%',
  }),
}));

const UploadBtn = ({ action, uploadProps, uploadBtnLabel, uploadBtnId }) => {
  const classes = useStyles();
  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id={uploadBtnId}
        onChange={action}
        type="file"
        disabled={uploadProps.disabled}
      />
      <label htmlFor={uploadBtnId}>
        <Button variant="outlined" color="primary" component="span" {...uploadProps}>
          {uploadBtnLabel}
        </Button>
      </label>
    </>
  );
};
UploadBtn.propTypes = {
  action: PropTypes.func.isRequired,
  uploadProps: PropTypes.shape({ disabled: PropTypes.bool }).isRequired,
  uploadBtnLabel: PropTypes.string.isRequired,
  uploadBtnId: PropTypes.number.isRequired,
};

const imageUpload = (props) => {
  const {
    id,
    styles,
    camera,
    defaultImage,
    returnImage,
    uploadBtnProps,
    cameraBtnProps,
    cancelBtnProps,
    takeBtnProps,
    maxImgSize,
    sizeErrorMsg,
    isNotImgErrorMsg,
    clearPreview,
  } = props;

  const { label: uploadBtnLabel = 'Upload', onClick: _up, ...restUploadBtnProps } = uploadBtnProps;
  const { label: cameraBtnLabel = 'Camera', onClick: _cam, ...restCameraBtnProps } = cameraBtnProps;
  const { label: cancelBtnLabel = 'Cancel', onClick: _can, ...restCancelBtnProps } = cancelBtnProps;
  const { label: takeBtnLabel = 'Take', onClick: _tak, ...restTakeBtnProps } = takeBtnProps;

  const classes = useStyles(styles);
  const [image, setImage] = React.useState(defaultImage);
  const [imagefile, setImageFile] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [webCam, setWebCamVisibility] = React.useState(false);
  const firstImgRef = React.useRef(defaultImage);
  const webcamRef = React.createRef();

  const handlerImage = (files) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    const file = files.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError(isNotImgErrorMsg);
        setImage(defaultImage);
        setImageFile(null);
      } else if (file.size > maxImgSize) {
        setError(sizeErrorMsg);
        setImage(defaultImage);
        setImageFile(null);
      } else {
        reader.onloadend = () => {
          setImageFile(file);
          setError(false);
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  React.useEffect(() => {
    if (returnImage instanceof Function && !error && firstImgRef.current !== image) {
      returnImage(image, imagefile);
    }
  }, [image, error]);

  /* const IMAGE_VIEW = (
    <img style={styles} alt="Preview" src={clearPreview ? firstImgRef.current : image} />
  ); */
  const IMAGE_VIEW = (
    <Image
      alt="Preview"
      src={clearPreview ? firstImgRef.current : getPublicIdFromImageUrl(image)}
      style={styles}
      width={styles.width}
      height={styles.height}
    />
  );

  const WEBCAM = (
    <div style={styles}>
      <Webcam
        style={{ margin: 2 }}
        audio={false}
        ref={webcamRef}
        videoConstraints={{
          facingMode: 'user',
        }}
        screenshotFormat="image/webp"
        width={styles.width - 5}
        height={styles.height - 5}
      />
    </div>
  );

  const cancelPhoto = () => setWebCamVisibility(false);

  const takePhoto = () => {
    if (!webCam) {
      setWebCamVisibility(true);
    } else {
      const imageSrc = webcamRef.current.getScreenshot();
      setWebCamVisibility(false);
      setImage(imageSrc);
      setError(false);
    }
  };

  const camBtnProp = webCam ? restTakeBtnProps : restCameraBtnProps;

  return (
    <div
      style={{
        width: styles.width,
        borderRadius: styles.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {!webCam ? IMAGE_VIEW : WEBCAM}
      {error && <label className={classes.error}>{error}</label>}
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
        {webCam ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={cancelPhoto}
            {...restCancelBtnProps}
          >
            {cancelBtnLabel}
          </Button>
        ) : (
          <UploadBtn
            uploadBtnId={id}
            action={handlerImage}
            uploadProps={restUploadBtnProps}
            uploadBtnLabel={uploadBtnLabel}
          />
        )}
        {camera && (
          <Button variant="outlined" color="inherit" onClick={takePhoto} {...camBtnProp}>
            {webCam ? takeBtnLabel : cameraBtnLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

imageUpload.propTypes = {
  id: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.any),
  camera: PropTypes.bool,
  defaultImage: PropTypes.string.isRequired,
  returnImage: PropTypes.func.isRequired,
  uploadBtnProps: PropTypes.objectOf(PropTypes.any),
  cameraBtnProps: PropTypes.objectOf(PropTypes.any),
  cancelBtnProps: PropTypes.objectOf(PropTypes.any),
  takeBtnProps: PropTypes.objectOf(PropTypes.any),
  maxImgSize: PropTypes.number,
  sizeErrorMsg: PropTypes.string,
  isNotImgErrorMsg: PropTypes.string,
  clearPreview: PropTypes.bool,
};
imageUpload.defaultProps = {
  styles: { height: 200, width: 200, backgroundColor: '#eee', borderRadius: '5px' },
  camera: false,
  uploadBtnProps: { onClick: () => {}, label: 'Upload' },
  cameraBtnProps: { onClick: () => {}, label: 'Camera' },
  cancelBtnProps: { onClick: () => {}, label: 'Cancel' },
  takeBtnProps: { onClick: () => {}, label: 'Take' },
  maxImgSize: 1048576,
  sizeErrorMsg: 'File size exceeds (1MB)',
  isNotImgErrorMsg: 'Only image are allowed',
  clearPreview: false,
};

export default imageUpload;
