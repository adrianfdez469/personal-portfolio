// TODO: En la vista movil, alinear las imagenes y los textos a la izquierda

import React, { useReducer, useRef, useEffect } from 'react';
import { TextField, CircularProgress, Typography, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
// Internal libs
import { isStringValidUrl } from '../../../libs/helpers';
// styles
import useStyles from './styles';

const initialState = {
  error: false,
  processing: false,
  link: '',
  preview: null,
  typing: false,
  validUrl: false,
  timeout: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_TYPING':
      return {
        link: action.value,
        error: false,
        validUrl: isStringValidUrl(action.value),
        preview: null,
        processing: false,
        typing: true,
      };
    case 'STOP_TYPING':
      return {
        ...state,
        typing: false,
        processing: isStringValidUrl(state.link),
      };
    case 'PREVIEW_ERROR': {
      return {
        ...state,
        error: true,
        preview: null,
        processing: false,
      };
    }
    case 'SET_PREVIEW': {
      return {
        ...state,
        error: false,
        preview: action.data,
        processing: false,
      };
    }
    case 'SET_LINK': {
      return {
        link: action.value,
        error: false,
        validUrl: isStringValidUrl(action.value),
        preview: null,
      };
    }
    default:
      return state;
  }
};

const LinkPreview = (props) => {
  // constants
  const { setLink, url, ...rest } = props;
  const abortController = useRef(new AbortController());

  // hooks
  const [{ link, error, validUrl, preview, processing, typing }, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const styles = useStyles();

  // efects
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (link !== '') {
        dispatch({ type: 'STOP_TYPING' });
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [link]);

  useEffect(() => {
    if (processing && typing) {
      abortController.current.abort();
    }
  }, [processing, link]);

  useEffect(() => {
    if (!typing && validUrl) {
      setLink(link);
      fetch(`/api/linkpreview`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ url: link }),
        signal: abortController.current.signal,
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error();
        })
        .then((resp) => {
          const { data } = resp;
          dispatch({ type: 'SET_PREVIEW', data: { ...data } });
        })
        .catch(() => {
          dispatch({ type: 'PREVIEW_ERROR' });
        });
    }
  }, [typing, validUrl, abortController, dispatch]);

  useEffect(() => {
    if (url) {
      dispatch({ type: 'SET_LINK', value: url });
    }
  }, [url]);

  // handlers
  const onChange = (event) => {
    dispatch({
      type: 'START_TYPING',
      value: event.target.value,
    });
  };

  let previewView = null;
  if (!error && processing) {
    previewView = (
      <div className={styles.divProcessing}>
        <CircularProgress size={16} />
      </div>
    );
  }
  if (preview !== null) {
    previewView = (
      <div className={styles.prevDataContainer}>
        <div className={styles.image}>
          <img src={preview.img} alt={preview.title} width={50} />
        </div>
        <div style={{ overflow: 'auto' }}>
          <Typography variant="button" display="block" className={styles.typografy}>
            {preview.title}
          </Typography>
          <Typography variant="caption" className={styles.typografy}>
            {preview.description}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.divContainer}>
      <TextField
        value={link || ''}
        onChange={onChange}
        label="Vínculo del proyecto"
        variant="outlined"
        margin="dense"
        className={styles.linkField}
        fullWidth={!greaterMdSize}
        {...rest}
      />
      {previewView}
    </div>
  );
};

LinkPreview.propTypes = {
  setLink: PropTypes.func.isRequired,
  url: PropTypes.string,
};
LinkPreview.defaultProps = {
  url: null,
};

export default LinkPreview;
