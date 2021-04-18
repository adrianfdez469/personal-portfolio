/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import { format, formatDistanceToNow, formatDistance } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useProjectContext } from '../../../store/contexts/projectContext';
import LinkPreview from '../LinkPreview';
import { useBodyStyles } from './styles';
import ImageViewer from '../ImageViewer';

const ImageLoader = ({ src }) => src;

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

const CardProjectLink = (props) => {
  const { link, devLink } = props;
  const styles = useBodyStyles();

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  if (!link && !devLink) return null;
  return (
    <Grid item md={6} xs={12} className={styles.grid}>
      <Card>
        {link && (
          <CardContent>
            <CardActionArea onClick={() => handleClick(link)}>
              <LinkPreview url={link} showTextField={false} readOnly />
            </CardActionArea>
          </CardContent>
        )}
        {devLink && (
          <CardContent>
            <CardActionArea onClick={() => handleClick(devLink)}>
              <LinkPreview url={devLink} showTextField={false} readOnly />
            </CardActionArea>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

const CardData = (props) => {
  const { initialDate, finalDate, otherInfo } = props;
  const styles = useBodyStyles();

  if (!initialDate && !finalDate && !otherInfo) return null;

  return (
    <Grid item md={6} xs={12} className={styles.grid}>
      <Card>
        <CardContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            {initialDate && (
              <Box padding={2}>
                <Typography variant="h4" style={{ fontSize: 16 }}>
                  Initial Date
                </Typography>
                <Typography variant="h5" style={{ fontSize: 14 }}>
                  {format(initialDate, 'MM/dd/yyyy')}
                </Typography>
                <Typography variant="h5" style={{ fontSize: 14 }}>
                  {formatDistanceToNow(initialDate, { addSuffix: true, locale: es })}
                </Typography>
              </Box>
            )}
            {initialDate && finalDate && (
              <Box padding={2}>
                <Typography variant="h4" style={{ fontSize: 16 }}>
                  Intervalo
                </Typography>
                <Typography variant="h5" style={{ fontSize: 14 }}>
                  {formatDistance(finalDate, initialDate, { addSuffix: true, locale: es })}
                </Typography>
              </Box>
            )}
            {finalDate && (
              <Box padding={2}>
                <Typography variant="h4" style={{ fontSize: 16 }}>
                  Final Date
                </Typography>
                <Typography variant="h5" style={{ fontSize: 14 }}>
                  {format(finalDate, 'MM/dd/yyyy')}
                </Typography>
                <Typography variant="h5" style={{ fontSize: 14 }}>
                  {formatDistanceToNow(finalDate, { addSuffix: true, locale: es })}
                </Typography>
              </Box>
            )}
          </div>
          {(initialDate || finalDate) && otherInfo && <Divider />}
          {otherInfo && (
            <Box padding={2}>
              <Typography variant="h4" style={{ fontSize: 16 }}>
                Other info
              </Typography>
              <Typography variant="h5" style={{ fontSize: 14 }}>
                {otherInfo}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

const ProjectBody = () => {
  const project = useProjectContext();
  console.log(project);
  return (
    <Grid container spacing={2} justify="space-between" style={{ margin: '8px 0', width: '100%' }}>
      <CardImages images={project.images} />
      <CardProjectLink link={project.projectLink} devLink={project.projectDevLink} />
      <CardData
        initialDate={project.initialDate}
        finalDate={project.finalDate}
        otherInfo={project.otherInfo}
      />
    </Grid>
  );
};

export default ProjectBody;
