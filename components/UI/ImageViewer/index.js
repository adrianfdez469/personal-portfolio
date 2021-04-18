import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { IconButton, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import useStyles from './styles';

const ImageViewer = (props) => {
  const { open, handleClose, images, selectedIndex } = props;
  const [selected, setSelected] = useState();
  const [scale, setScale] = useState(1);
  const styles = useStyles();

  useEffect(() => {
    if (open) {
      setSelected(selectedIndex);
      setScale(1);
    } else setSelected(-1);
  }, [open]);

  const handleNext = () => {
    if (images.length - 1 > selected) {
      setSelected((state) => state + 1);
    }
  };
  const handlePrev = () => {
    if (selected > 0) {
      setSelected((state) => state - 1);
    }
  };
  const handleZoomIn = () => {
    setScale((state) => (state < 3 ? state + 0.1 : state));
  };
  const handleZoomOut = () => {
    setScale((state) => (state > 0.5 ? state - 0.1 : state));
  };
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  if (selected < 0) return null;
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'inherit',
        },
      }}
    >
      <div className={styles.mainDiv}>
        <IconButton onClick={handleClose} className={styles.iconButton}>
          <CloseIcon />
        </IconButton>
      </div>
      <div
        className={styles.imageContainer}
        style={{
          transform: `scale(${scale})`,
        }}
        onWheel={handleScroll}
      >
        <Image
          loader={({ src }) => src}
          src={images[selected]}
          quality={100}
          alt="image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.buttonsBar}>
        <div>
          <IconButton onClick={handlePrev} disabled={selected === 0} className={styles.iconButton}>
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton onClick={handleZoomOut} disabled={scale <= 0.5} className={styles.iconButton}>
            <ZoomOutIcon />
          </IconButton>

          <IconButton onClick={handleZoomIn} disabled={scale >= 3} className={styles.iconButton}>
            <ZoomInIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={images.length - 1 === selected}
            className={styles.iconButton}
          >
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    </Dialog>
  );
};

ImageViewer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default ImageViewer;
