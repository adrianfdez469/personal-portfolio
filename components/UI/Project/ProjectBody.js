/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import { useProjectContext } from '../../../store/contexts/projectContext';
import LinkPreview from '../LinkPreview';
import { useBodyStyles } from './styles';

const ImageLoader = ({ src }) => src;

const CardProjectLink = ({ url }) => {
  const styles = useBodyStyles();
  if (!url || url === '') return null;
  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardContent>
          <LinkPreview url={url} showTextField={false} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ImageViewer = (props) => {
  const { open, handleClose, images, selectedIndex } = props;
  const [selected, setSelected] = useState();
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
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
    setScale((state) => state + 0.1);
  };
  const handleZoomOut = () => {
    setScale((state) => state - 0.1);
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
      <div style={{ position: 'absolute', right: 16, zIndex: 999, overflow: 'hidden' }}>
        <IconButton
          onClick={handleClose}
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: 'auto',
            margin: '0 16px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div
        style={{
          width: '100%',
          minHeight: '75vh',
          transform: `scale(${scale})`,
          overflow: 'auto',
        }}
      >
        <Image
          loader={ImageLoader}
          src={images[selected]}
          quality={100}
          alt="image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        style={{
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <IconButton
            onClick={handlePrev}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: 'auto',
              margin: '0 16px',
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            onClick={handleZoomOut}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: 'auto',
              margin: '0 16px',
            }}
          >
            <ZoomOutIcon />
          </IconButton>

          <IconButton
            onClick={handleZoomIn}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: 'auto',
              margin: '0 16px',
            }}
          >
            <ZoomInIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              width: 'auto',
              margin: '0 16',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </Dialog>
  );
};
const CardImages = (props) => {
  const { images } = props;
  const styles = useBodyStyles();
  const [selectedImg, setSelectedImg] = useState(-1);

  const handleSelectImg = (index) => {
    setSelectedImg(index);
  };
  const handleDeselectImg = () => {
    setSelectedImg(-1);
  };

  if (!images || images.length === 0) return null;
  return (
    <>
      <Card className={styles.card}>
        <Grid item container spacing={2} className={styles.grid}>
          {images.map((image, idx) => (
            <Grid
              key={image.id}
              item
              md={4}
              sm={6}
              xs={12}
              style={{ padding: '8px 0', width: 'inherit' }}
            >
              <CardContent>
                <CardActionArea onClick={() => handleSelectImg(idx)}>
                  <div
                    style={{
                      minWidth: 300,
                      minHeight: 250,
                    }}
                  >
                    <Image
                      loader={ImageLoader}
                      src={image.imageUrl}
                      quality={100}
                      alt="image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </CardActionArea>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Card>
      <ImageViewer
        selectedIndex={selectedImg}
        handleClose={handleDeselectImg}
        images={images.map((img) => img.imageUrl)}
        open={selectedImg > -1}
      />
    </>
  );
};

const ProjectBody = () => {
  const project = useProjectContext();
  console.log(project);
  return (
    <Grid container spacing={2} justify="space-between" style={{ margin: '8px 0', width: '100%' }}>
      <CardImages images={project.images} />
    </Grid>
  );
};

export default ProjectBody;
