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
  Link,
  CardHeader,
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { format, formatDistanceToNow, formatDistance } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-US';
import { useProjectContext } from '../../../store/contexts/projectContext';
import OptimizedAvatar from '../Avatar/AvatarPhoto';
import LinkPreview from '../LinkPreview';
import { useBodyStyles } from './styles';
import ImageViewer from '../ImageViewer';
import { useLang } from '../../../store/contexts/langContext';

const dateLocales = {
  en: enLocale,
  es: esLocale,
};

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
    <Grid item xs={12} className={styles.grid}>
      <Card>
        <Grid
          md={images.length > 1 ? 12 : 6}
          sm={12}
          item
          container
          spacing={2}
          className={styles.grid}
        >
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
    </Grid>
  );
};

const CardProjectLink = (props) => {
  const { link, devLink } = props;
  const { lang } = useLang();
  const styles = useBodyStyles();

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  if (!link && !devLink) return null;
  return (
    <Grid item md={6} xs={12} className={styles.grid}>
      <Card style={{ height: '100%' }}>
        {link && (
          <CardContent>
            <CardActionArea onClick={() => handleClick(link)}>
              <LinkPreview
                scale={1.2}
                url={link}
                showTextField={false}
                readOnly
                label={lang.projectLink}
              />
            </CardActionArea>
          </CardContent>
        )}
        {devLink && (
          <CardContent>
            <CardActionArea onClick={() => handleClick(devLink)}>
              <LinkPreview
                scale={1.2}
                url={devLink}
                showTextField={false}
                readOnly
                label={lang.projectDevLink}
              />
            </CardActionArea>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

const CardData = (props) => {
  const { initialDate, finalDate, otherInfo } = props;
  const { lang, locale } = useLang();
  const styles = useBodyStyles();

  if (!initialDate && !finalDate && !otherInfo) return null;

  return (
    <Grid item md={6} xs={12} className={styles.grid}>
      <Card style={{ height: '100%' }}>
        <CardContent
          style={{
            height: '100%',
            display: 'flez',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {initialDate && (
              <Box padding={1}>
                <Typography variant="body1" className={styles.dateRow}>
                  <TodayIcon className={styles.dateIcon} />
                  {`${lang.iniDate} ${formatDistanceToNow(initialDate, {
                    addSuffix: true,
                    locale: dateLocales[locale],
                  })}: ${format(initialDate, lang.formatDate)} `}
                </Typography>
              </Box>
            )}
            {initialDate && finalDate && (
              <Box padding={1}>
                <Typography variant="body1" className={styles.dateRow}>
                  <DateRangeIcon className={styles.dateIcon} />
                  {`${formatDistance(finalDate, initialDate, {
                    locale: dateLocales[locale],
                  })} ${lang.ofWork}`}
                </Typography>
              </Box>
            )}

            {finalDate && (
              <Box padding={1}>
                <Typography variant="body1" className={styles.dateRow}>
                  <EventIcon className={styles.dateIcon} />
                  {`${lang.finished} ${formatDistanceToNow(finalDate, {
                    addSuffix: true,
                    locale: dateLocales[locale],
                  })}: ${format(finalDate, lang.formatDate)} `}
                </Typography>
              </Box>
            )}
          </div>
          {(initialDate || finalDate) && otherInfo && <Divider />}
          {otherInfo && (
            <Box padding={1}>
              <Typography variant="h4" className={styles.dateRow}>
                {`${lang.otherInfo}:`}
              </Typography>
              <Typography variant="h5" className={styles.dateRow}>
                {otherInfo}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

const CardCollaborators = (props) => {
  const { collaborators } = props;
  const { lang } = useLang();
  const styles = useBodyStyles();

  if (!collaborators || collaborators.length === 0) return null;
  return (
    <Grid item xs={12} className={styles.grid}>
      <Card>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Grid container justify="space-evenly">
            {collaborators
              .sort((a, b) => {
                if (a.isOwner) return -1;
                if (b.isOwner) return 1;
                return 0;
              })
              .map((collaborator) => (
                <Grid item md={3} sm={6} xs={12} key={collaborator.login}>
                  <Divider />
                  <Typography
                    variant="button"
                    color={collaborator.isOwner ? 'textPrimary' : 'textSecondary'}
                    component="p"
                    align="center"
                  >
                    {collaborator.isOwner ? `(${lang.owner})` : `(${lang.collaborator})`}
                  </Typography>
                  <Divider />
                  <CardHeader
                    avatar={
                      <OptimizedAvatar
                        size="xsmall"
                        src={collaborator.avatarUrl}
                        alt={collaborator.name}
                        quality={20}
                      />
                    }
                    title={collaborator.name}
                    subheader={collaborator.email}
                  />

                  <CardContent>
                    <Link href={collaborator.url} target="_blank">
                      <Typography>{collaborator.url}</Typography>
                    </Link>
                    <Typography color="textSecondary">{collaborator.bio}</Typography>
                  </CardContent>
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ProjectBody = () => {
  const project = useProjectContext();
  const styles = useBodyStyles();
  return (
    <Grid
      container
      spacing={2}
      justify="space-between"
      className={styles.gridCardContainer}
      style={{ marginTop: 4 }}
    >
      <CardImages images={project.images} />

      <CardProjectLink link={project.projectLink} devLink={project.projectDevLink} />
      <CardData
        initialDate={project.initialDate}
        finalDate={project.finalDate}
        otherInfo={project.otherInfo}
      />
      <CardCollaborators collaborators={project.collaborators} />
    </Grid>
  );
};

export default ProjectBody;
