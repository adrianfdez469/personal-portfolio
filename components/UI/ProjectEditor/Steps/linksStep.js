// TODO: use styles with sizes from the style file
// TODO: Handle state with reducer
// TODO: Add 2 other links for github and gitlab code
// TODO: Switch to Graphql endpint

// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, CircularProgress } from '@material-ui/core';
// Internal libs
import { isStringValidUrl } from '../../../../libs/helpers';
// Components
import ProjectStep from './ProjectStep';

// Styles
import { useStepsStyles } from '../styles';

export const LINKS = 'LINKS';

export const LinksForm = (props) => {
  // constants
  const { stepId } = props;

  // hooks
  const [projectLink, setProjectLink] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(true);

  // styles
  const classes = useStepsStyles();

  // helpers
  const tryFetchLinkPrev = async (url) => {
    const resp = await fetch(`/api/linkpreview/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    return resp;
  };
  // handlers
  const onProjectLinkChangeHandler = (event) => {
    const url = event.target.value;
    setProjectLink(url);

    if (isStringValidUrl(url)) {
      setTimeout(async () => {
        setProcessing(true);
        setPreview(null);
        const response = await tryFetchLinkPrev(url);
        if (response.ok) {
          const data = await response.json();
          if (!data.error) {
            setPreview({
              ...data.data,
              title: data.data.title.slice(0, 35),
              description: data.data.description.slice(0, 150),
            });
          } else {
            setError(true);
          }
          setProcessing(false);
        }
      }, 500);
    }
  };

  let previewView = null;
  if (error) {
    previewView = (
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, margin: 16 }}
      >
        <Typography color="error">No se pudo cargar la vista previa</Typography>
      </div>
    );
  }
  if (processing) {
    previewView = (
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, margin: 16 }}
      >
        <CircularProgress size={16} />
      </div>
    );
  }
  if (preview !== null) {
    previewView = (
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, margin: 16 }}
      >
        <div style={{ marginRight: 8 }}>
          <img src={preview.img} alt={preview.title} width={50} />
        </div>
        <div style={{ overflow: 'auto' }}>
          <Typography variant="button" display="block" style={{ fontSize: 12 }}>
            {preview.title}
          </Typography>
          <Typography variant="caption" style={{ fontSize: 12 }}>
            {preview.description}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <Box className={classes.mainContent} hidden={stepId !== LINKS}>
      <Box className={classes.stepDescriptor}>
        <Typography align="center" variant="overline" style={{ display: 'block' }}>
          Puedes mostrar tu trabajo en línea? Compártelo para que otros lo vean.
        </Typography>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 100,
        }}
      >
        <TextField
          value={projectLink || ''}
          onChange={onProjectLinkChangeHandler}
          label="Vínculo del proyecto"
          style={{ flex: 0.7 }}
          variant="outlined"
          margin="dense"
        />
        {previewView}
      </div>
    </Box>
  );
};

LinksForm.propTypes = {
  stepId: PropTypes.string.isRequired,
};

export const linksObj = new ProjectStep(LINKS, 'Enlaces externos');
